'use client';

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

const mockProfitData = [
  { date: '2024-01', value: 0, apy: 0 },
  { date: '2024-02', value: 1200, apy: 8.5 },
  { date: '2024-03', value: 2800, apy: 12.3 },
  { date: '2024-04', value: 4200, apy: 14.8 },
  { date: '2024-05', value: 6100, apy: 16.2 },
  { date: '2024-06', value: 8500, apy: 18.5 },
  { date: '2024-07', value: 11200, apy: 19.8 },
];

export function ProfitTab() {
  const totalProfit = mockProfitData[mockProfitData.length - 1].value;
  const currentApy = mockProfitData[mockProfitData.length - 1].apy;
  const profitChange = mockProfitData.length > 1
    ? ((mockProfitData[mockProfitData.length - 1].value - mockProfitData[mockProfitData.length - 2].value) / mockProfitData[mockProfitData.length - 2].value * 100).toFixed(2)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm text-zinc-400">Total Profit</span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">${totalProfit.toLocaleString()}</p>
          <p className="text-sm text-green-400">+{profitChange}% this month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Percent className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-sm text-zinc-400">Current APY</span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{currentApy}%</p>
          <p className="text-sm text-zinc-400">Portfolio average</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-sm text-zinc-400">ROI</span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">112.5%</p>
          <p className="text-sm text-purple-400">All time</p>
        </motion.div>
      </div>

      {/* Profit Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Profit Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockProfitData}>
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" stroke="#71717a" />
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
              fill="url(#profitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* APY Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">APY Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockProfitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" stroke="#71717a" />
            <YAxis stroke="#71717a" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Line
              type="monotone"
              dataKey="apy"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
