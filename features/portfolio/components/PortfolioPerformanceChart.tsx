'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { usePortfolioData } from '../hooks';
import { TimeFrame } from '../types';
import ActivePositionsDonut from './ActivePositionsDonut';

export default function PortfolioPerformanceChart() {
  const { getChartData, positions } = usePortfolioData();
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>('1W');

  const chartData = getChartData(selectedTimeframe);
  const currentValue = 127340;
  const periodChange = 2340;
  const periodChangePercentage = 1.87;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-6"
    >
      {/* Portfolio Chart - 3/4 width */}
      <div className="lg:col-span-3 rounded-2xl bg-[#1a1a1a] border border-[#262626]">
        <div className="p-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
          </div>
        </div>

        <div className="p-6">
          {/* Timeframe Selector */}
          <div className="flex justify-end gap-2 mb-4">
            {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === period
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#262626] text-[#a1a1a1] hover:bg-[#2a2a2a]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                </linearGradient>
              </defs>

              {/* Area */}
              <path
                d={`M 0 ${200 - ((chartData[0]?.value - 120000) / 200)}
                   ${chartData.map((point, i) => `L ${(i / (chartData.length - 1)) * 800} ${200 - ((point.value - 120000) / 200)}`).join(' ')}
                   L 800 200 L 0 200 Z`}
                fill="url(#chartGradient)"
              />

              {/* Line */}
              <path
                d={`M 0 ${200 - ((chartData[0]?.value - 120000) / 200)}
                   ${chartData.map((point, i) => `L ${(i / (chartData.length - 1)) * 800} ${200 - ((point.value - 120000) / 200)}`).join(' ')}`}
                fill="none"
                stroke="rgba(16, 185, 129, 1)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Summary */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[#262626]">
            <div className="text-center">
              <p className="text-xs text-[#a1a1a1] mb-1">Current Value</p>
              <p className="text-xl font-bold text-white">${currentValue.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-[#a1a1a1] mb-1">Period Change</p>
              <div className="flex items-center justify-center gap-1">
                <p className="text-xl font-bold text-green-400">+${periodChange.toLocaleString()}</p>
                <span className="text-sm text-green-400">(+{periodChangePercentage}%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donut Chart - 1/4 width */}
      <div className="lg:col-span-1 rounded-2xl bg-[#1a1a1a] border border-[#262626] p-6">
        <ActivePositionsDonut positions={positions} />
      </div>
    </motion.div>
  );
}
