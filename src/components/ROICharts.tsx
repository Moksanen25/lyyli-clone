"use client";

import { memo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import type { TranslationKeys } from "@/lib/i18n";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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
  translations?: TranslationKeys;
}

const ROICharts = memo(function ROICharts({ 
  timeSavingsData, 
  efficiencyData, 
  translations 
}: ROIChartsProps) {
  // Bar chart data for efficiency comparison
  const efficiencyChartData = {
    labels: efficiencyData.map(d => d.metric),
    datasets: [
      {
        label: translations?.["roi.charts.timeSpent"] || "Time spent",
        data: efficiencyData.map(d => d.value),
        backgroundColor: "#2F5D50",
        borderRadius: 4,
        barThickness: 40,
      },
    ],
  };

  const efficiencyChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${value} ${translations?.["roi.charts.hoursPerWeek"] || "hours/week"}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
      y: {
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };

  // Line chart data for cumulative savings
  const savingsChartData = {
    labels: timeSavingsData.map(d => d.month.toString()),
    datasets: [
      {
        label: translations?.["roi.charts.savings"] || "Savings",
        data: timeSavingsData.map(d => d.moneySaved),
        borderColor: "#2F5D50",
        backgroundColor: "rgba(47, 93, 80, 0.1)",
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#2F5D50",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const savingsChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y || 0;
            return `${value.toLocaleString()}€`;
          },
          title: (context) => {
            const month = context[0].label;
            const template = translations?.["roi.charts.monthLabel"] || "Month {month}";
            return template.replace("{month}", month);
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
      y: {
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };

  return (
    <>
      {/* Efficiency Comparison Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
        <h4 className="text-lg font-semibold text-forest mb-4 font-sans">
          {translations?.["roi.charts.efficiencyComparison"] || "Time efficiency comparison"}
        </h4>
        <div className="h-64">
          <Bar data={efficiencyChartData} options={efficiencyChartOptions} />
        </div>
      </div>

      {/* Cumulative Savings Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-forest mb-4 font-sans">
          {translations?.["roi.charts.cumulativeSavings"] || "Cumulative savings over time"}
        </h4>
        <div className="h-64">
          <Line data={savingsChartData} options={savingsChartOptions} />
        </div>
      </div>
    </>
  );
});

export default ROICharts;
