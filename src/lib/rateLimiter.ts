/**
 * Advanced rate limiting system with configurable storage backends
 * Supports in-memory, Redis, and database storage options
 */

import { logger } from './logger';

export interface RateLimitConfig {
  windowMs: number;        // Time window in milliseconds
  maxRequests: number;     // Maximum requests per window
  skipSuccessfulRequests?: boolean;  // Skip rate limiting for successful requests
  skipFailedRequests?: boolean;      // Skip rate limiting for failed requests
  keyGenerator?: (identifier: string) => string;  // Custom key generator
  handler?: (req: any, res: any) => void;        // Custom handler for rate limit exceeded
  onLimitReached?: (identifier: string, config: RateLimitConfig) => void;  // Callback when limit reached
}

export interface RateLimitResult {
  isAllowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter: number;
  totalRequests: number;
}

export interface RateLimitEntry {
  count: number;
  resetTime: number;
  firstRequest: number;
  lastRequest: number;
}

export interface RateLimitStorage {
  get(key: string): Promise<RateLimitEntry | null>;
  set(key: string, entry: RateLimitEntry): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  cleanup(): Promise<void>;
}

/**
 * In-memory storage implementation (default)
 * Note: This is not suitable for production with multiple server instances
 */
class InMemoryStorage implements RateLimitStorage {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  async get(key: string): Promise<RateLimitEntry | null> {
    const entry = this.store.get(key);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() > entry.resetTime) {
      this.store.delete(key);
      return null;
    }

    return entry;
  }

  async set(key: string, entry: RateLimitEntry): Promise<void> {
    this.store.set(key, entry);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

/**
 * Redis storage implementation (production-ready)
 */
class RedisStorage implements RateLimitStorage {
  private redis: any;
  private prefix: string;

  constructor(redisClient: any, prefix: string = 'rate_limit:') {
    this.redis = redisClient;
    this.prefix = prefix;
  }

  async get(key: string): Promise<RateLimitEntry | null> {
    try {
      const data = await this.redis.get(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Redis rate limit get error', { key, error: error instanceof Error ? error.message : 'Unknown error' });
      return null;
    }
  }

  async set(key: string, entry: RateLimitEntry): Promise<void> {
    try {
      const ttl = Math.ceil((entry.resetTime - Date.now()) / 1000);
      await this.redis.setex(this.prefix + key, ttl, JSON.stringify(entry));
    } catch (error) {
      logger.error('Redis rate limit set error', { key, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(this.prefix + key);
    } catch (error) {
      logger.error('Redis rate limit delete error', { key, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await this.redis.keys(`${this.prefix  }*`);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      logger.error('Redis rate limit clear error', { error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  async cleanup(): Promise<void> {
    // Redis automatically handles cleanup with TTL
    // This method is kept for interface compatibility
  }
}

/**
 * Main rate limiter class
 */
export class RateLimiter {
  private storage: RateLimitStorage;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig, storage?: RateLimitStorage) {
    this.config = {
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      ...config
    };
    
    this.storage = storage || new InMemoryStorage();
  }

  /**
   * Check if a request is allowed
   */
  async checkLimit(identifier: string): Promise<RateLimitResult> {
    try {
      const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
      const now = Date.now();
      
      // Get current rate limit entry
      let entry = await this.storage.get(key);
      
      if (!entry) {
        // First request
        entry = {
          count: 1,
          resetTime: now + this.config.windowMs,
          firstRequest: now,
          lastRequest: now
        };
      } else if (now > entry.resetTime) {
        // Window has expired, reset
        entry = {
          count: 1,
          resetTime: now + this.config.windowMs,
          firstRequest: now,
          lastRequest: now
        };
      } else {
        // Within window, increment count
        entry.count++;
        entry.lastRequest = now;
      }

      // Check if limit exceeded
      const isAllowed = entry.count <= this.config.maxRequests;
      
      if (!isAllowed && this.config.onLimitReached) {
        this.config.onLimitReached(identifier, this.config);
      }

      // Store updated entry
      await this.storage.set(key, entry);

      // Calculate remaining requests and reset time
      const remaining = Math.max(0, this.config.maxRequests - entry.count);
      const resetTime = entry.resetTime;
      const retryAfter = Math.ceil((resetTime - now) / 1000);

      return {
        isAllowed,
        remaining,
        resetTime,
        retryAfter,
        totalRequests: entry.count
      };

    } catch (error) {
      logger.error('Rate limit check error', {
        identifier,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      // On error, allow the request (fail open for safety)
      return {
        isAllowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: Date.now() + this.config.windowMs,
        retryAfter: 0,
        totalRequests: 1
      };
    }
  }

  /**
   * Reset rate limit for an identifier
   */
  async resetLimit(identifier: string): Promise<void> {
    try {
      const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
      await this.storage.delete(key);
    } catch (error) {
      logger.error('Rate limit reset error', {
        identifier,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Get current rate limit status for an identifier
   */
  async getStatus(identifier: string): Promise<RateLimitResult | null> {
    try {
      const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
      const entry = await this.storage.get(key);
      
      if (!entry) return null;

      const now = Date.now();
      const isAllowed = entry.count <= this.config.maxRequests;
      const remaining = Math.max(0, this.config.maxRequests - entry.count);
      const resetTime = entry.resetTime;
      const retryAfter = Math.ceil((resetTime - now) / 1000);

      return {
        isAllowed,
        remaining,
        resetTime,
        retryAfter,
        totalRequests: entry.count
      };
    } catch (error) {
      logger.error('Rate limit status error', {
        identifier,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      return null;
    }
  }

  /**
   * Clean up expired entries
   */
  async cleanup(): Promise<void> {
    await this.storage.cleanup();
  }

  /**
   * Destroy the rate limiter and cleanup resources
   */
  destroy(): void {
    if (this.storage instanceof InMemoryStorage) {
      this.storage.destroy();
    }
  }
}

/**
 * Predefined rate limit configurations
 */
export const RATE_LIMIT_CONFIGS = {
  // Strict rate limiting for authentication endpoints
  STRICT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },

  // Moderate rate limiting for form submissions
  MODERATE: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },

  // Relaxed rate limiting for general API endpoints
  RELAXED: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },

  // Very relaxed for public read endpoints
  PUBLIC: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 1000,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },
};

/**
 * Create a rate limiter instance with default configuration
 */
export function createRateLimiter(config: Partial<RateLimitConfig> = {}) {
  const defaultConfig: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    ...config
  };

  return new RateLimiter(defaultConfig);
}

/**
 * Create a rate limiter with predefined configuration
 */
export function createRateLimiterWithPreset(preset: keyof typeof RATE_LIMIT_CONFIGS, customConfig?: Partial<RateLimitConfig>) {
  const presetConfig = RATE_LIMIT_CONFIGS[preset];
  const config = { ...presetConfig, ...customConfig };
  
  return new RateLimiter(config);
}
