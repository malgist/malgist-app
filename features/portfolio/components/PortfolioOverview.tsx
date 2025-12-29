'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { usePortfolioData } from '../hooks';

export default function PortfolioOverview() {
  const { stats } = usePortfolioData();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Portfolio Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/10 to-emerald-500/10 border border-emerald-500/20"
      >
        <p className="text-sm text-[#a1a1a1] mb-2">Total Portfolio Value</p>
        <div className="flex items-baseline gap-3 mb-2">
          <h2 className="text-4xl font-bold text-white">${stats.totalBalance.toLocaleString()}</h2>
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-semibold">+{stats.totalProfitPercentage.toFixed(2)}%</span>
          </div>
        </div>
        <p className="text-sm text-[#a1a1a1]">
          Total Profit: <span className="text-green-400 font-medium">+${stats.totalProfit.toLocaleString()}</span>
        </p>
      </motion.div>

      {/* 24h Change */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#262626]"
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-[#a1a1a1]" />
          <p className="text-sm text-[#a1a1a1]">24h Change</p>
        </div>
        <p className="text-3xl font-bold text-green-400">+${stats.dayChange.toLocaleString()}</p>
        <p className="text-sm text-green-400 mt-1">+{stats.dayChangePercentage}%</p>
      </motion.div>

      {/* Average APY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#262626]"
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-[#a1a1a1]" />
          <p className="text-sm text-[#a1a1a1]">Average APY</p>
        </div>
        <p className="text-3xl font-bold text-white">{stats.avgApy.toFixed(2)}%</p>
        <p className="text-sm text-[#a1a1a1] mt-1">Weighted average</p>
      </motion.div>
    </div>
  );
}
