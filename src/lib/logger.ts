/**
 * Centralized logging service for the application
 * Replaces console.log statements with structured, environment-aware logging
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  requestId?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string;
  appName: string;
  version: string;
}

class Logger {
  private config: LoggerConfig;
  private isDevelopment: boolean;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    
    this.config = {
      level: this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO,
      enableConsole: this.isDevelopment,
      enableRemote: !this.isDevelopment,
      appName: 'lyyli-clone',
      version: '0.1.0',
      ...config
    };
  }

  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log an error message
   */
  error(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, context);
  }

  /**
   * Log form submission events
   */
  logFormSubmission(formType: string, success: boolean, context?: Record<string, unknown>): void {
    this.info(`Form submission: ${formType}`, {
      success,
      formType,
      timestamp: new Date().toISOString(),
      ...context
    });
  }

  /**
   * Log API events
   */
  logApiEvent(endpoint: string, method: string, status: number, context?: Record<string, unknown>): void {
    this.info(`API ${method} ${endpoint}`, {
      endpoint,
      method,
      status,
      timestamp: new Date().toISOString(),
      ...context
    });
  }

  /**
   * Log user interactions
   */
  logUserInteraction(action: string, context?: Record<string, unknown>): void {
    this.info(`User interaction: ${action}`, {
      action,
      timestamp: new Date().toISOString(),
      ...context
    });
  }

  /**
   * Log performance metrics
   */
  logPerformance(metric: string, value: number, unit: string, context?: Record<string, unknown>): void {
    this.info(`Performance: ${metric}`, {
      metric,
      value,
      unit,
      timestamp: new Date().toISOString(),
      ...context
    });
  }

  /**
   * Log security events
   */
  logSecurityEvent(event: string, severity: 'low' | 'medium' | 'high', context?: Record<string, unknown>): void {
    const level = severity === 'high' ? LogLevel.ERROR : severity === 'medium' ? LogLevel.WARN : LogLevel.INFO;
    this.log(level, `Security event: ${event}`, {
      event,
      severity,
      timestamp: new Date().toISOString(),
      ...context
    });
  }

  /**
   * Core logging method
   */
  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    // Check if we should log this level
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      // Add request context if available
      requestId: this.getRequestId(),
      sessionId: this.getSessionId(),
      userId: this.getUserId(),
    };

    // Console logging (development)
    if (this.config.enableConsole) {
      this.logToConsole(entry);
    }

    // Remote logging (production)
    if (this.config.enableRemote && this.config.remoteEndpoint) {
      this.logToRemote(entry);
    }
  }

  /**
   * Check if we should log at the given level
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex >= currentLevelIndex;
  }

  /**
   * Log to console with proper formatting
   */
  private logToConsole(entry: LogEntry): void {
    const { level, message, context, timestamp } = entry;
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`${prefix} ${message}`, context);
        break;
      case LogLevel.INFO:
        console.info(`${prefix} ${message}`, context);
        break;
      case LogLevel.WARN:
        console.warn(`${prefix} ${message}`, context);
        break;
      case LogLevel.ERROR:
        console.error(`${prefix} ${message}`, context);
        break;
    }
  }

  /**
   * Log to remote service (production)
   */
  private async logToRemote(entry: LogEntry): Promise<void> {
    try {
      if (typeof window !== 'undefined' && this.config.remoteEndpoint) {
        await fetch(this.config.remoteEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entry),
        });
      }
    } catch (error) {
      // Fallback to console if remote logging fails
      console.error('Failed to send log to remote service:', error);
    }
  }

  /**
   * Get current request ID (if available)
   */
  private getRequestId(): string | undefined {
    // In a real app, this would come from request context
    return undefined;
  }

  /**
   * Get current session ID (if available)
   */
  private getSessionId(): string | undefined {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('sessionId') || undefined;
    }
    return undefined;
  }

  /**
   * Get current user ID (if available)
   */
  private getUserId(): string | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || undefined;
    }
    return undefined;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const logger = new Logger();

// Export logger class for testing
export { Logger };
