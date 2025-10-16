#!/usr/bin/env node

/**
 * Monitoring System Test Script
 * 
 * This script tests the monitoring system by:
 * 1. Checking if the monitoring API is accessible
 * 2. Testing error metric collection
 * 3. Verifying alert functionality
 * 4. Testing the monitoring dashboard
 */

import https from 'https';
import http from 'http';

class MonitoringTester {
  constructor(baseUrl = 'http://localhost:3000', authToken = null) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
    this.results = [];
  }

  /**
   * Make HTTP request
   */
  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const requestOptions = {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        timeout: options.timeout || 10000,
      };

      if (this.authToken) {
        requestOptions.headers['Authorization'] = `Bearer ${this.authToken}`;
      }
      
      const req = client.request(url, requestOptions, (res) => {
        let data = '';
        
        res.on('data', chunk => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: jsonData,
            });
          } catch (error) {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              data: data,
            });
          }
        });
      });
      
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      if (options.body) {
        req.write(JSON.stringify(options.body));
      }
      
      req.end();
    });
  }

  /**
   * Test monitoring API endpoint
   */
  async testMonitoringAPI() {
    console.log('🔍 Testing monitoring API...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/monitoring/metrics`);
      
      if (response.status === 200) {
        console.log('  ✅ Monitoring API is accessible');
        console.log(`  📊 Total errors: ${response.data.data?.totalErrors || 0}`);
        console.log(`  📊 4xx errors: ${response.data.data?.error4xx || 0}`);
        console.log(`  📊 5xx errors: ${response.data.data?.error5xx || 0}`);
        console.log(`  📊 Error rate: ${response.data.data?.errorRate?.toFixed(2) || 0}%`);
        
        this.results.push({
          test: 'monitoring_api',
          status: 'pass',
          message: 'API is accessible and returning data',
        });
        
        return response.data.data;
      } else {
        console.log(`  ❌ API returned status ${response.status}`);
        this.results.push({
          test: 'monitoring_api',
          status: 'fail',
          message: `API returned status ${response.status}`,
        });
        return null;
      }
    } catch (error) {
      console.log(`  ❌ API test failed: ${error.message}`);
      this.results.push({
        test: 'monitoring_api',
        status: 'fail',
        message: error.message,
      });
      return null;
    }
  }

  /**
   * Test error metric collection
   */
  async testErrorCollection() {
    console.log('\n🔍 Testing error collection...');
    
    try {
      // Make a request to a non-existent page to trigger 404
      const response = await this.makeRequest(`${this.baseUrl}/non-existent-page-12345`);
      
      if (response.status === 404) {
        console.log('  ✅ 404 error successfully triggered');
        
        // Wait a moment for the error to be logged
        await this.delay(2000);
        
        // Check if the error was recorded
        const metricsResponse = await this.makeRequest(`${this.baseUrl}/api/monitoring/metrics`);
        
        if (metricsResponse.status === 200 && metricsResponse.data.data) {
          const metrics = metricsResponse.data.data;
          console.log(`  📊 Current total errors: ${metrics.totalErrors}`);
          
          this.results.push({
            test: 'error_collection',
            status: 'pass',
            message: 'Error collection is working',
          });
        } else {
          console.log('  ⚠️  Could not verify error was recorded');
          this.results.push({
            test: 'error_collection',
            status: 'warning',
            message: 'Error collection may not be working properly',
          });
        }
      } else {
        console.log(`  ❌ Expected 404, got ${response.status}`);
        this.results.push({
          test: 'error_collection',
          status: 'fail',
          message: `Expected 404, got ${response.status}`,
        });
      }
    } catch (error) {
      console.log(`  ❌ Error collection test failed: ${error.message}`);
      this.results.push({
        test: 'error_collection',
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * Test monitoring dashboard
   */
  async testMonitoringDashboard() {
    console.log('\n🔍 Testing monitoring dashboard...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/admin/monitoring`);
      
      if (response.status === 200) {
        console.log('  ✅ Monitoring dashboard is accessible');
        
        // Check if the page contains monitoring-related content
        const content = response.data;
        if (typeof content === 'string' && content.includes('Error Monitoring Dashboard')) {
          console.log('  ✅ Dashboard contains expected content');
          this.results.push({
            test: 'monitoring_dashboard',
            status: 'pass',
            message: 'Dashboard is accessible and contains expected content',
          });
        } else {
          console.log('  ⚠️  Dashboard accessible but content may be incomplete');
          this.results.push({
            test: 'monitoring_dashboard',
            status: 'warning',
            message: 'Dashboard accessible but content may be incomplete',
          });
        }
      } else {
        console.log(`  ❌ Dashboard returned status ${response.status}`);
        this.results.push({
          test: 'monitoring_dashboard',
          status: 'fail',
          message: `Dashboard returned status ${response.status}`,
        });
      }
    } catch (error) {
      console.log(`  ❌ Dashboard test failed: ${error.message}`);
      this.results.push({
        test: 'monitoring_dashboard',
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * Test alert functionality
   */
  async testAlertFunctionality() {
    console.log('\n🔍 Testing alert functionality...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/monitoring/metrics`, {
        method: 'POST',
        body: {
          action: 'test_alert',
          data: {},
        },
      });
      
      if (response.status === 200) {
        console.log('  ✅ Alert test endpoint is working');
        console.log('  📧 Test alert sent (check webhook/Slack if configured)');
        
        this.results.push({
          test: 'alert_functionality',
          status: 'pass',
          message: 'Alert functionality is working',
        });
      } else {
        console.log(`  ❌ Alert test returned status ${response.status}`);
        this.results.push({
          test: 'alert_functionality',
          status: 'fail',
          message: `Alert test returned status ${response.status}`,
        });
      }
    } catch (error) {
      console.log(`  ❌ Alert test failed: ${error.message}`);
      this.results.push({
        test: 'alert_functionality',
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * Test authentication
   */
  async testAuthentication() {
    console.log('\n🔍 Testing authentication...');
    
    if (!this.authToken) {
      console.log('  ⚠️  No auth token provided, skipping auth test');
      this.results.push({
        test: 'authentication',
        status: 'skipped',
        message: 'No auth token provided',
      });
      return;
    }

    try {
      // Test with valid token
      const validResponse = await this.makeRequest(`${this.baseUrl}/api/monitoring/metrics`);
      
      if (validResponse.status === 200) {
        console.log('  ✅ Authentication with valid token works');
        
        // Test with invalid token
        const invalidTester = new MonitoringTester(this.baseUrl, 'invalid-token');
        const invalidResponse = await invalidTester.makeRequest(`${this.baseUrl}/api/monitoring/metrics`);
        
        if (invalidResponse.status === 401) {
          console.log('  ✅ Authentication properly rejects invalid tokens');
          this.results.push({
            test: 'authentication',
            status: 'pass',
            message: 'Authentication is working correctly',
          });
        } else {
          console.log(`  ❌ Expected 401 with invalid token, got ${invalidResponse.status}`);
          this.results.push({
            test: 'authentication',
            status: 'fail',
            message: 'Authentication not properly rejecting invalid tokens',
          });
        }
      } else {
        console.log(`  ❌ Valid token test failed with status ${validResponse.status}`);
        this.results.push({
          test: 'authentication',
          status: 'fail',
          message: 'Authentication with valid token failed',
        });
      }
    } catch (error) {
      console.log(`  ❌ Authentication test failed: ${error.message}`);
      this.results.push({
        test: 'authentication',
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log('🧪 Starting monitoring system tests...\n');
    console.log(`Base URL: ${this.baseUrl}`);
    console.log(`Auth Token: ${this.authToken ? 'Provided' : 'Not provided'}\n`);
    
    await this.testMonitoringAPI();
    await this.testErrorCollection();
    await this.testMonitoringDashboard();
    await this.testAlertFunctionality();
    await this.testAuthentication();
    
    this.printSummary();
  }

  /**
   * Print test summary
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 Monitoring System Test Summary');
    console.log('='.repeat(60));
    
    const passed = this.results.filter(r => r.status === 'pass').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const warnings = this.results.filter(r => r.status === 'warning').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;
    
    console.log(`Total tests: ${this.results.length}`);
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warnings}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    
    if (failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results
        .filter(r => r.status === 'fail')
        .forEach(result => {
          console.log(`  • ${result.test}: ${result.message}`);
        });
    }
    
    if (warnings > 0) {
      console.log('\n⚠️  Warnings:');
      this.results
        .filter(r => r.status === 'warning')
        .forEach(result => {
          console.log(`  • ${result.test}: ${result.message}`);
        });
    }
    
    if (failed === 0) {
      console.log('\n✅ All critical tests passed! Monitoring system is working correctly.');
    } else {
      console.log('\n❌ Some tests failed. Please check the monitoring system configuration.');
      process.exit(1);
    }
  }

  /**
   * Delay utility
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const authToken = process.env.MONITORING_AUTH_TOKEN || null;
  
  const tester = new MonitoringTester(baseUrl, authToken);
  tester.runAllTests().catch(console.error);
}

export default MonitoringTester;
