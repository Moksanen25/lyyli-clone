'use client';

import React, { useState, useEffect } from 'react';
import { performanceMonitor, performanceUtils } from '@/lib/performance';
import { logger } from '@/lib/logger';

interface PerformanceDashboardProps {
  refreshInterval?: number; // in milliseconds
  showBundleAnalysis?: boolean;
  showCoreWebVitals?: boolean;
  showMetrics?: boolean;
}

export default function PerformanceDashboard({
  refreshInterval = 30000, // 30 seconds
  showBundleAnalysis = true,
  showCoreWebVitals = true,
  showMetrics = true,
}: PerformanceDashboardProps) {
  const [summary, setSummary] = useState<any>(null);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    // Start performance monitoring
    performanceMonitor.start();
    setIsMonitoring(true);

    // Initial data load
    refreshData();

    // Set up refresh interval
    const interval = setInterval(refreshData, refreshInterval);

    return () => {
      clearInterval(interval);
      performanceMonitor.stop();
      setIsMonitoring(false);
    };
  }, [refreshInterval]);

  const refreshData = () => {
    try {
      const newSummary = performanceMonitor.getPerformanceSummary();
      const newMetrics = performanceMonitor.getMetrics();
      
      setSummary(newSummary);
      setMetrics(newMetrics);
      setLastRefresh(new Date());

      logger.info('Performance dashboard refreshed', {
        totalMetrics: newSummary.totalMetrics,
        averageLoadTime: newSummary.averageLoadTime,
      });
    } catch (error) {
      logger.error('Failed to refresh performance dashboard', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const clearMetrics = () => {
    performanceMonitor.clearMetrics();
    setMetrics([]);
    setSummary(null);
    logger.info('Performance metrics cleared');
  };

  const exportMetrics = () => {
    try {
      const dataStr = JSON.stringify(metrics, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `performance-metrics-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      logger.info('Performance metrics exported', {
        count: metrics.length,
        filename: link.download,
      });
    } catch (error) {
      logger.error('Failed to export performance metrics', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const formatMetricValue = (value: number, unit: string): string => {
    if (unit === 'ms') {
      return `${value.toFixed(2)}ms`;
    }
    if (unit === 'score') {
      return value.toFixed(3);
    }
    return `${value}${unit}`;
  };

  const getMetricColor = (name: string, value: number): string => {
    if (name === 'lcp') {
      if (value <= 2500) return 'text-green-600';
      if (value <= 4000) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (name === 'fid') {
      if (value <= 100) return 'text-green-600';
      if (value <= 300) return 'text-yellow-600';
      return 'text-red-600';
    }
    if (name === 'cls') {
      if (value <= 0.1) return 'text-green-600';
      if (value <= 0.25) return 'text-yellow-600';
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  if (!summary) {
    return (
      <div className="p-6 bg-white  rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200  rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200  rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Performance Dashboard
          </h2>
          <p className="text-gray-600">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={clearMetrics}
            className="px-4 py-2 bg-gray-200  text-gray-700  rounded-lg hover:bg-gray-300  transition-colors"
          >
            Clear
          </button>
          <button
            onClick={exportMetrics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-4">
        <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600 
          Monitoring: {isMonitoring ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white  p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900  mb-2">
            Total Metrics
          </h3>
          <p className="text-3xl font-bold text-forest">
            {summary.totalMetrics}
          </p>
        </div>
        
        <div className="bg-white  p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900  mb-2">
            Average Load Time
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {summary.averageLoadTime.toFixed(2)}ms
          </p>
        </div>
        
        <div className="bg-white  p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900  mb-2">
            Monitoring Status
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {isMonitoring ? 'ON' : 'OFF'}
          </p>
        </div>
      </div>

      {/* Core Web Vitals */}
      {showCoreWebVitals && summary.coreWebVitals && (
        <div className="bg-white  p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900  mb-4">
            Core Web Vitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(summary.coreWebVitals).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`text-2xl font-bold ${getMetricColor(key, value as number)}`}>
                  {formatMetricValue(value as number, key === 'cls' ? 'score' : 'ms')}
                </div>
                <div className="text-sm text-gray-600  uppercase">
                  {key}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bundle Analysis */}
      {showBundleAnalysis && summary.bundleAnalysis && (
        <div className="bg-white  p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900  mb-4">
            Bundle Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {summary.bundleAnalysis.totalSize}KB
              </div>
              <div className="text-sm text-gray-600  Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {summary.bundleAnalysis.chunks}
              </div>
              <div className="text-sm text-gray-600 
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {summary.bundleAnalysis.jsSize}KB
              </div>
              <div className="text-sm text-gray-600 
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {summary.bundleAnalysis.cssSize}KB
              </div>
              <div className="text-sm text-gray-600 
            </div>
          </div>
        </div>
      )}

      {/* Metrics Table */}
      {showMetrics && metrics.length > 0 && (
        <div className="bg-white  p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-900  mb-4">
            Recent Metrics ({metrics.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 
              <thead className="bg-gray-50 
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white  divide-y divide-gray-200 
                {metrics.slice(-10).reverse().map((metric, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 
                      {metric.name}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${getMetricColor(metric.name, metric.value)}`}>
                      {formatMetricValue(metric.value, metric.unit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 
                      {metric.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 
                      {new Date(metric.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Metrics Message */}
      {showMetrics && metrics.length === 0 && (
        <div className="bg-white  p-6 rounded-lg shadow text-center">
          <p className="text-gray-500 
            No performance metrics collected yet. Metrics will appear here as they are recorded.
          </p>
        </div>
      )}
    </div>
  );
}
