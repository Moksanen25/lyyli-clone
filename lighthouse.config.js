module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/cache-test',
        'http://localhost:3000/en/blog',
        'http://localhost:3000/en/features',
        'http://localhost:3000/en/pricing'
      ],
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        }
      }
    },
    assert: {
      assertions: {
        // Performance assertions
        'categories:performance': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        
        // Caching assertions
        'uses-long-cache-ttl': ['error', { minScore: 0.9 }],
        'total-byte-weight': ['warn', { maxNumericValue: 1600000 }],
        'uses-optimized-images': ['warn', { minScore: 0.8 }],
        'uses-text-compression': ['warn', { minScore: 0.9 }],
        'uses-efficient-animated-content': ['warn', { minScore: 0.8 }],
        
        // Best practices
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'uses-https': 'off', // Allow HTTP for local testing
        'is-on-https': 'off',
        
        // Accessibility
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        
        // SEO
        'categories:seo': ['warn', { minScore: 0.9 }],
        'meta-description': ['warn', { minScore: 0.9 }],
        'document-title': ['warn', { minScore: 0.9 }],
        'link-text': ['warn', { minScore: 0.9 }],
        
        // PWA (if applicable)
        'categories:pwa': 'off'
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    }
  }
};
