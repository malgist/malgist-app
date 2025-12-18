'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Target, Sparkles, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMonthlyData = [
  { day: 1, value: 10000, apy: 8.5 },
  { day: 5, value: 10250, apy: 9.2 },
  { day: 10, value: 10580, apy: 10.5 },
  { day: 15, value: 10820, apy: 11.8 },
  { day: 20, value: 11150, apy: 12.3 },
  { day: 25, value: 11480, apy: 13.1 },
  { day: 30, value: 11850, apy: 14.2 },
];

interface MonthlyReportProps {
  month?: string;
  year?: number;
}

export function MonthlyReport({ month = 'November', year = 2024 }: MonthlyReportProps) {
  const startValue = mockMonthlyData[0].value;
  const endValue = mockMonthlyData[mockMonthlyData.length - 1].value;
  const profit = endValue - startValue;
  const profitPercent = ((profit / startValue) * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AI Monthly Report</h2>
              <p className="text-sm text-zinc-400">{month} {year}</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm">Export PDF</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-xs text-zinc-400">Total Profit</span>
          </div>
          <p className="text-2xl font-bold text-white">${profit.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">+{profitPercent}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-zinc-400">Avg APY</span>
          </div>
          <p className="text-2xl font-bold text-white">11.1%</p>
          <p className="text-xs text-zinc-400 mt-1">Portfolio average</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-zinc-400">Strategy Score</span>
          </div>
          <p className="text-2xl font-bold text-white">9.2/10</p>
          <p className="text-xs text-purple-400 mt-1">Excellent</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-zinc-400">Active Days</span>
          </div>
          <p className="text-2xl font-bold text-white">30/30</p>
          <p className="text-xs text-zinc-400 mt-1">100% uptime</p>
        </motion.div>
      </div>

      {/* Portfolio Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Growth Trajectory</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockMonthlyData}>
            <defs>
              <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="day" stroke="#71717a" label={{ value: 'Day of Month', position: 'insideBottom', offset: -5 }} />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#monthlyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-linear-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/20"
      >
        <div className="flex items-start gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-indigo-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Performance Analysis</h3>
            <p className="text-sm text-zinc-300 mb-4">
              Your portfolio demonstrated exceptional performance this month, outperforming the market benchmark by 4.8%.
              The balanced strategy you selected achieved optimal risk-adjusted returns.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <h4 className="text-sm font-semibold text-white mb-2">🎯 Key Achievements</h4>
            <ul className="space-y-1 text-sm text-zinc-300">
              <li>• Successfully maintained 100% protocol uptime</li>
              <li>• Rebalanced portfolio 3 times for optimal allocation</li>
              <li>• Captured APY increases across 4 protocols</li>
              <li>• Zero impermanent loss incidents</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <h4 className="text-sm font-semibold text-white mb-2">💡 Recommendations for Next Month</h4>
            <ul className="space-y-1 text-sm text-zinc-300">
              <li>• Consider increasing exposure to liquid staking (market conditions favorable)</li>
              <li>• Monitor Aave V3 TVL changes for potential APY shifts</li>
              <li>• Optimal time to compound rewards: every 15 days</li>
              <li>• Diversification score: 8.5/10 - consider adding 1 more protocol</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
            <h4 className="text-sm font-semibold text-white mb-2">⚠️ Risk Assessment</h4>
            <p className="text-sm text-zinc-300">
              Current risk exposure: <span className="text-green-400 font-semibold">Low-Medium</span>.
              All protocols maintain strong TVL and security audits. No immediate rebalancing required.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Top Performing Protocols</h3>
        <div className="space-y-3">
          {[
            { protocol: 'Lido', return: '+8.2%', apy: '6.8%', rank: 1 },
            { protocol: 'Yearn Finance', return: '+7.5%', apy: '7.5%', rank: 2 },
            { protocol: 'Aave V3', return: '+5.2%', apy: '5.2%', rank: 3 },
          ].map((protocol) => (
            <div key={protocol.protocol} className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-sm font-bold text-indigo-400">
                  #{protocol.rank}
                </div>
                <span className="font-medium text-white">{protocol.protocol}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-zinc-400">Monthly Return</p>
                  <p className="text-green-400 font-semibold">{protocol.return}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400">APY</p>
                  <p className="text-white font-semibold">{protocol.apy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
