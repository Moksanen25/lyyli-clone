import type { NextRequest, NextResponse } from 'next/server';
import { logger } from './logger';

export interface ErrorMetrics {
  timestamp: string;
  statusCode: number;
  url: string;
  method: string;
  userAgent?: string;
  referer?: string;
  ip?: string;
  responseTime?: number;
  errorType: '4xx' | '5xx' | 'timeout' | 'other';
}

export interface AlertThresholds {
  errorSpikeThreshold: number; // errors per minute
  errorRateThreshold: number; // percentage
  timeWindow: number; // minutes
}

export interface MonitoringConfig {
  enabled: boolean;
  logErrors: boolean;
  trackMetrics: boolean;
  alertThresholds: AlertThresholds;
  webhookUrl?: string;
  slackWebhook?: string;
}

// Default configuration
export const DEFAULT_MONITORING_CONFIG: MonitoringConfig = {
  enabled: process.env.NODE_ENV === 'production',
  logErrors: true,
  trackMetrics: true,
  alertThresholds: {
    errorSpikeThreshold: 10, // 10 errors per minute
    errorRateThreshold: 5,   // 5% error rate
    timeWindow: 5,           // 5 minute window
  },
  webhookUrl: process.env.MONITORING_WEBHOOK_URL,
  slackWebhook: process.env.SLACK_WEBHOOK_URL,
};

// In-memory metrics store (in production, use Redis or database)
const metricsStore: ErrorMetrics[] = [];
const MAX_METRICS_HISTORY = 10000; // Keep last 10k metrics

/**
 * Log error metrics
 */
export function logErrorMetric(
  request: NextRequest,
  response: NextResponse,
  responseTime?: number
): void {
  const config = DEFAULT_MONITORING_CONFIG;
  
  if (!config.enabled || !config.trackMetrics) {
    return;
  }

  const statusCode = response.status;
  const errorType = getErrorType(statusCode);
  
  // Only track 4xx and 5xx errors
  if (!['4xx', '5xx'].includes(errorType)) {
    return;
  }

  const metric: ErrorMetrics = {
    timestamp: new Date().toISOString(),
    statusCode,
    url: request.url,
    method: request.method,
    userAgent: request.headers.get('user-agent') || undefined,
    referer: request.headers.get('referer') || undefined,
    ip: getClientIP(request),
    responseTime,
    errorType,
  };

  // Add to metrics store
  metricsStore.push(metric);
  
  // Trim old metrics
  if (metricsStore.length > MAX_METRICS_HISTORY) {
    metricsStore.splice(0, metricsStore.length - MAX_METRICS_HISTORY);
  }

  // Log error if enabled
  if (config.logErrors) {
    logger.error('Error Metric', {
      statusCode,
      url: request.url,
      method: request.method,
      ip: metric.ip,
      userAgent: metric.userAgent,
      timestamp: metric.timestamp,
    });
  }

  // Check for error spikes
  checkErrorSpike();
}

/**
 * Get error type from status code
 */
function getErrorType(statusCode: number): ErrorMetrics['errorType'] {
  if (statusCode >= 500) return '5xx';
  if (statusCode >= 400) return '4xx';
  if (statusCode === 408 || statusCode === 504) return 'timeout';
  return 'other';
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Check for error spikes and send alerts
 */
function checkErrorSpike(): void {
  const config = DEFAULT_MONITORING_CONFIG;
  
  if (!config.webhookUrl && !config.slackWebhook) {
    return;
  }

  const now = new Date();
  const timeWindowMs = config.alertThresholds.timeWindow * 60 * 1000;
  const cutoffTime = new Date(now.getTime() - timeWindowMs);
  
  // Get recent 5xx errors
  const recentErrors = metricsStore.filter(metric => 
    metric.errorType === '5xx' && 
    new Date(metric.timestamp) > cutoffTime
  );
  
  const errorCount = recentErrors.length;
  const errorRate = (errorCount / config.alertThresholds.timeWindow) * 100;
  
  // Check if we've exceeded thresholds
  const spikeDetected = errorCount >= config.alertThresholds.errorSpikeThreshold ||
                       errorRate >= config.alertThresholds.errorRateThreshold;
  
  if (spikeDetected) {
    sendErrorAlert({
      errorCount,
      errorRate,
      timeWindow: config.alertThresholds.timeWindow,
      recentErrors: recentErrors.slice(-10), // Last 10 errors
    });
  }
}

/**
 * Send error alert
 */
async function sendErrorAlert(alertData: {
  errorCount: number;
  errorRate: number;
  timeWindow: number;
  recentErrors: ErrorMetrics[];
}): Promise<void> {
  const config = DEFAULT_MONITORING_CONFIG;
  
  const alertMessage = {
    title: '🚨 5xx Error Spike Detected',
    message: `Detected ${alertData.errorCount} 5xx errors in the last ${alertData.timeWindow} minutes (${alertData.errorRate.toFixed(2)}% error rate)`,
    details: {
      errorCount: alertData.errorCount,
      errorRate: alertData.errorRate,
      timeWindow: alertData.timeWindow,
      recentErrors: alertData.recentErrors.map(error => ({
        statusCode: error.statusCode,
        url: error.url,
        timestamp: error.timestamp,
        method: error.method,
      })),
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  };

  // Send to webhook
  if (config.webhookUrl) {
    try {
      await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alertMessage),
      });
    } catch (error) {
      logger.error('Failed to send webhook alert', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Send to Slack
  if (config.slackWebhook) {
    try {
      const slackMessage = {
        text: alertMessage.title,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${alertMessage.title}*\n${alertMessage.message}`,
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Environment:* ${alertMessage.environment}`,
              },
              {
                type: 'mrkdwn',
                text: `*Error Count:* ${alertData.errorCount}`,
              },
              {
                type: 'mrkdwn',
                text: `*Error Rate:* ${alertData.errorRate.toFixed(2)}%`,
              },
              {
                type: 'mrkdwn',
                text: `*Time Window:* ${alertData.timeWindow} minutes`,
              },
            ],
          },
        ],
      };

      await fetch(config.slackWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackMessage),
      });
    } catch (error) {
      logger.error('Failed to send Slack alert', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

/**
 * Get error metrics summary
 */
export function getErrorMetricsSummary(timeWindowMinutes: number = 60): {
  totalErrors: number;
  error4xx: number;
  error5xx: number;
  errorRate: number;
  topErrorUrls: Array<{ url: string; count: number }>;
  recentErrors: ErrorMetrics[];
} {
  const now = new Date();
  const cutoffTime = new Date(now.getTime() - timeWindowMinutes * 60 * 1000);
  
  const recentMetrics = metricsStore.filter(metric => 
    new Date(metric.timestamp) > cutoffTime
  );
  
  const error4xx = recentMetrics.filter(m => m.errorType === '4xx').length;
  const error5xx = recentMetrics.filter(m => m.errorType === '5xx').length;
  const totalErrors = error4xx + error5xx;
  
  // Calculate error rate (assuming some baseline traffic)
  const errorRate = totalErrors / Math.max(1, recentMetrics.length) * 100;
  
  // Get top error URLs
  const urlCounts = recentMetrics.reduce((acc, metric) => {
    acc[metric.url] = (acc[metric.url] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topErrorUrls = Object.entries(urlCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([url, count]) => ({ url, count }));
  
  return {
    totalErrors,
    error4xx,
    error5xx,
    errorRate,
    topErrorUrls,
    recentErrors: recentMetrics.slice(-50), // Last 50 errors
  };
}

/**
 * Clear old metrics (call periodically)
 */
export function clearOldMetrics(maxAgeHours: number = 24): void {
  const cutoffTime = new Date(Date.now() - maxAgeHours * 60 * 60 * 1000);
  const initialLength = metricsStore.length;
  
  // Remove old metrics
  for (let i = metricsStore.length - 1; i >= 0; i--) {
    if (new Date(metricsStore[i].timestamp) < cutoffTime) {
      metricsStore.splice(i, 1);
    }
  }
  
  const removedCount = initialLength - metricsStore.length;
  if (removedCount > 0) {
    logger.info('Cleared old error metrics', { removedCount });
  }
}
