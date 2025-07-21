import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface UsageChartProps {
  chartData: Array<{
    date: string;
    requests: number;
  }>;
  timeRange?: "7d" | "30d" | "90d";
}

export const UsageChart: React.FC<UsageChartProps> = ({
  chartData,
  timeRange = "7d",
}) => {
  // Calculate statistics
  const totalRequests = chartData.reduce((sum, data) => sum + data.requests, 0);
  const avgRequests = chartData.length > 0 ? totalRequests / chartData.length : 0;
  const maxRequests = Math.max(...chartData.map((d) => d.requests), 1);

  // Calculate trend
  const firstHalf = chartData.slice(0, Math.floor(chartData.length / 2));
  const secondHalf = chartData.slice(Math.floor(chartData.length / 2));
  const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d.requests, 0) / (firstHalf.length || 1);
  const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d.requests, 0) / (secondHalf.length || 1);
  const trendPercentage = firstHalfAvg > 0
    ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100
    : 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeRange === "7d") {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else if (timeRange === "30d") {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else {
      return date.toLocaleDateString("en-US", { month: "short" });
    }
  };

  const getTrendIcon = () => {
    if (Math.abs(trendPercentage) < 1) {
      return <Minus className="w-4 h-4" />;
    } else if (trendPercentage > 0) {
      return <TrendingUp className="w-4 h-4" />;
    } else {
      return <TrendingDown className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    if (Math.abs(trendPercentage) < 1) {
      return "text-gray-600";
    } else if (trendPercentage > 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          No usage data available yet
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Start making API requests to see your usage statistics
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Total Requests
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalRequests.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Daily Average
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(avgRequests).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Trend
          </p>
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <p className="text-2xl font-bold">
              {Math.abs(Math.round(trendPercentage))}%
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="h-64 flex items-end space-x-2">
          {chartData.map((data, index) => {
            const height = maxRequests > 0 ? (data.requests / maxRequests) * 100 : 0;
            return (
              <motion.div
                key={`${data.date}-${index}`}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex-1 flex flex-col items-center group relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {data.requests} requests
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                      <div className="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t hover:from-blue-600 hover:to-cyan-600 transition-colors cursor-pointer relative">
                  {/* Value label on bar for significant values */}
                  {data.requests > 0 && height > 20 && (
                    <div className="absolute top-2 left-0 right-0 text-center">
                      <span className="text-xs font-semibold text-white">
                        {data.requests}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex items-center space-x-2 mt-4">
          {chartData.map((data, index) => (
            <div key={`label-${data.date}-${index}`} className="flex-1 text-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {formatDate(data.date)}
              </span>
            </div>
          ))}
        </div>

        {/* Y-axis reference lines */}
        <div className="absolute left-0 top-0 h-64 flex flex-col justify-between pointer-events-none">
          {[100, 75, 50, 25, 0].map((percentage) => (
            <div
              key={percentage}
              className="flex items-center space-x-2 -ml-12 text-xs text-gray-500"
            >
              <span className="w-8 text-right">
                {Math.round((maxRequests * percentage) / 100)}
              </span>
              <div className="w-full border-t border-gray-300 dark:border-gray-600 border-dashed opacity-50"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-t from-blue-500 to-cyan-500 rounded"></div>
            <span className="text-gray-600 dark:text-gray-400">API Requests</span>
          </div>
        </div>
        <div className="text-gray-500 dark:text-gray-500">
          {timeRange === "7d" && "Last 7 days"}
          {timeRange === "30d" && "Last 30 days"}
          {timeRange === "90d" && "Last 90 days"}
        </div>
      </div>
    </div>
  );
};

export default UsageChart;
