# 📊 Monitoring System Setup Guide

## Overview

This guide covers the setup and configuration of the runtime monitoring system for tracking 404s, 5xx errors, and broken links.

## 🔧 Environment Variables

Add these environment variables to your `.env.local` and production environment:

```bash
# Monitoring Configuration
MONITORING_AUTH_TOKEN=your-secure-auth-token-here
MONITORING_WEBHOOK_URL=https://your-webhook-endpoint.com/monitoring
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Optional: Alert Thresholds (defaults shown)
MONITORING_ERROR_SPIKE_THRESHOLD=10
MONITORING_ERROR_RATE_THRESHOLD=5
MONITORING_TIME_WINDOW=5
```

### Environment Variable Details

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONITORING_AUTH_TOKEN` | Token for API authentication | - | **Yes** |
| `MONITORING_WEBHOOK_URL` | Webhook URL for alerts | - | No |
| `SLACK_WEBHOOK_URL` | Slack webhook for notifications | - | No |
| `MONITORING_ERROR_SPIKE_THRESHOLD` | Errors per minute to trigger alert | 10 | No |
| `MONITORING_ERROR_RATE_THRESHOLD` | Error rate percentage to trigger alert | 5% | No |
| `MONITORING_TIME_WINDOW` | Time window in minutes for alerts | 5 | No |

## 🚀 Quick Setup

### 1. Generate Auth Token

```bash
# Generate a secure random token
openssl rand -hex 32
# or
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Configure Environment

```bash
# Add to .env.local
echo "MONITORING_AUTH_TOKEN=$(openssl rand -hex 32)" >> .env.local
```

### 3. Test Monitoring System

```bash
# Test locally
npm run monitoring:test

# Test on production
npm run monitoring:test:prod
```

## 📊 Monitoring Dashboard

Access the monitoring dashboard at: `/admin/monitoring`

### Features:
- Real-time error metrics
- 4xx/5xx error tracking
- Top error URLs
- Recent error history
- Configurable time windows
- Auto-refresh every 30 seconds

## 🔗 Broken Link Checking

### Local Testing
```bash
# Check internal links only
npm run links:check:internal

# Check all links (local)
npm run links:check

# Check all links (production)
npm run links:check:prod
```

### CI Integration
The broken link checker runs automatically in CI and will fail if broken internal links are detected.

## 🚨 Alert Configuration

### Webhook Alerts
Set up a webhook endpoint to receive error alerts:

```json
{
  "title": "🚨 5xx Error Spike Detected",
  "message": "Detected 15 5xx errors in the last 5 minutes (7.50% error rate)",
  "details": {
    "errorCount": 15,
    "errorRate": 7.5,
    "timeWindow": 5,
    "recentErrors": [...]
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "production"
}
```

### Slack Alerts
Configure Slack webhook for team notifications:

1. Create a Slack app in your workspace
2. Add an incoming webhook
3. Copy the webhook URL
4. Set `SLACK_WEBHOOK_URL` environment variable

### Alert Thresholds

| Threshold | Description | Action |
|-----------|-------------|---------|
| **Error Spike** | 10+ errors in 5 minutes | Immediate alert |
| **Error Rate** | 5%+ error rate | Immediate alert |
| **404 Errors** | Logged and tracked | Dashboard display |
| **5xx Errors** | Logged and tracked | Alert triggers |

## 🧪 Testing

### Test Error Collection
```bash
# Trigger a 404 error
curl -I http://localhost:3000/non-existent-page

# Check if error was recorded
npm run monitoring:test
```

### Test Alerts
```bash
# Send test alert
curl -X POST http://localhost:3000/api/monitoring/metrics \
  -H "Authorization: Bearer $MONITORING_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"action": "test_alert"}'
```

### Test Broken Links
```bash
# Start the application
npm run dev

# In another terminal, check links
npm run links:check:internal
```

## 📈 Monitoring Metrics

### API Endpoint
`GET /api/monitoring/metrics?timeWindow=60`

### Response Format
```json
{
  "success": true,
  "data": {
    "totalErrors": 25,
    "error4xx": 20,
    "error5xx": 5,
    "errorRate": 2.5,
    "topErrorUrls": [
      { "url": "/missing-page", "count": 10 },
      { "url": "/broken-link", "count": 5 }
    ],
    "recentErrors": [...],
    "timeWindow": 60,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🔒 Security

### Authentication
- All monitoring endpoints require authentication
- Use `MONITORING_AUTH_TOKEN` for API access
- Dashboard access should be restricted to admin users

### Data Privacy
- IP addresses are logged for error tracking
- User agents are captured for debugging
- No sensitive data is logged in error metrics

### Rate Limiting
- Monitoring API has built-in rate limiting
- Error collection is throttled to prevent spam
- Alert frequency is limited to prevent notification fatigue

## 🚀 Production Deployment

### Vercel Deployment
```bash
# Set environment variables in Vercel dashboard
vercel env add MONITORING_AUTH_TOKEN
vercel env add SLACK_WEBHOOK_URL
vercel env add MONITORING_WEBHOOK_URL

# Deploy
vercel --prod
```

### Docker Deployment
```dockerfile
# Add to Dockerfile
ENV MONITORING_AUTH_TOKEN=your-token
ENV SLACK_WEBHOOK_URL=your-slack-webhook
ENV MONITORING_WEBHOOK_URL=your-webhook
```

### Health Checks
```bash
# Add to your health check endpoint
curl -f http://your-domain.com/api/monitoring/metrics \
  -H "Authorization: Bearer $MONITORING_AUTH_TOKEN"
```

## 📋 Troubleshooting

### Common Issues

#### 1. Monitoring API Not Accessible
```bash
# Check if server is running
curl -I http://localhost:3000/api/monitoring/metrics

# Check authentication
curl -H "Authorization: Bearer $MONITORING_AUTH_TOKEN" \
  http://localhost:3000/api/monitoring/metrics
```

#### 2. Alerts Not Sending
- Verify webhook URLs are correct
- Check network connectivity
- Review error logs for webhook failures

#### 3. Broken Link Checker Failing
- Ensure application is built (`npm run build`)
- Check if server is running
- Verify sitemap.xml exists

#### 4. High Error Rates
- Check application logs
- Verify database connectivity
- Review recent deployments

### Debug Mode
```bash
# Enable debug logging
DEBUG=monitoring:* npm run dev

# Check monitoring logs
tail -f logs/monitoring.log
```

## 📚 API Reference

### Monitoring Endpoints

#### GET /api/monitoring/metrics
Get current error metrics.

**Query Parameters:**
- `timeWindow` (optional): Time window in minutes (default: 60)

**Headers:**
- `Authorization: Bearer <token>` (required)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalErrors": 25,
    "error4xx": 20,
    "error5xx": 5,
    "errorRate": 2.5,
    "topErrorUrls": [...],
    "recentErrors": [...],
    "timeWindow": 60,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

#### POST /api/monitoring/metrics
Perform monitoring actions.

**Actions:**
- `clear_metrics`: Clear old metrics
- `test_alert`: Send test alert

**Example:**
```bash
curl -X POST /api/monitoring/metrics \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"action": "test_alert"}'
```

## 🎯 Best Practices

### 1. Regular Monitoring
- Check dashboard daily
- Set up automated alerts
- Review error trends weekly

### 2. Link Maintenance
- Run broken link checks before deployments
- Monitor external link health
- Update outdated URLs promptly

### 3. Error Response
- Respond to 5xx alerts immediately
- Investigate 404 spikes
- Track error resolution times

### 4. Performance
- Monitor error collection overhead
- Clean old metrics regularly
- Optimize alert thresholds

## 📞 Support

For issues with the monitoring system:
1. Check this documentation
2. Review error logs
3. Test with provided scripts
4. Contact the development team

---

**Last Updated:** January 2024
**Version:** 1.0.0
