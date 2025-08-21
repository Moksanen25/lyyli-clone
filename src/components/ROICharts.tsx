"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface ROIChartsProps {
  timeSavingsData: Array<{
    month: number;
    timeSaved: number;
    moneySaved: number;
  }>;
  efficiencyData: Array<{
    metric: string;
    value: number;
    fill: string;
  }>;
}

export default function ROICharts({ timeSavingsData, efficiencyData }: ROIChartsProps) {
  return (
    <>
      {/* Efficiency Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600 mb-8">
        <h4 className="text-lg font-semibold text-forest dark:text-white mb-4 font-sans">
          Time efficiency comparison
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="metric" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                formatter={(value: number) => [`${value} hours/week`, 'Time spent']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="value" fill="#2F5D50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Savings Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-600">
        <h4 className="text-lg font-semibold text-forest dark:text-white mb-4 font-sans">
          Cumulative savings over time
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSavingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                formatter={(value: number) => [`€${value.toLocaleString()}`, 'Savings']}
                labelFormatter={(label) => `Month ${label}`}
                labelStyle={{ color: '#374151' }}
              />
              <Line 
                type="monotone" 
                dataKey="moneySaved" 
                stroke="#2F5D50" 
                strokeWidth={3}
                dot={{ fill: '#2F5D50', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
