'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp } from 'lucide-react';

const mockPositions = [
  {
    id: '1',
    protocol: 'Aave V3',
    type: 'Lending',
    amount: 5000,
    value: 5250,
    apy: 5.2,
    earnings: 250,
    color: '#6366f1',
  },
  {
    id: '2',
    protocol: 'Lido',
    type: 'Staking',
    amount: 4500,
    value: 4860,
    apy: 6.8,
    earnings: 360,
    color: '#8b5cf6',
  },
  {
    id: '3',
    protocol: 'Yearn Finance',
    type: 'Yield',
    amount: 3500,
    value: 3892,
    apy: 7.5,
    earnings: 392,
    color: '#ec4899',
  },
  {
    id: '4',
    protocol: 'Compound',
    type: 'Lending',
    amount: 2000,
    value: 2180,
    apy: 8.5,
    earnings: 180,
    color: '#14b8a6',
  },
];

const pieData = mockPositions.map(pos => ({
  name: pos.protocol,
  value: pos.value,
}));

export function PositionTab() {
  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.value, 0);
  const totalEarnings = mockPositions.reduce((sum, pos) => sum + pos.earnings, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <h3 className="text-sm text-zinc-400 mb-2">Total Portfolio Value</h3>
          <p className="text-3xl font-bold text-white mb-1">${totalValue.toLocaleString()}</p>
          <p className="text-sm text-green-400">+${totalEarnings.toLocaleString()} earnings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <h3 className="text-sm text-zinc-400 mb-2">Active Positions</h3>
          <p className="text-3xl font-bold text-white mb-1">{mockPositions.length}</p>
          <p className="text-sm text-zinc-400">Across {new Set(mockPositions.map(p => p.type)).size} categories</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Allocation Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={mockPositions[index].color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  color: '#ffffff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Protocol Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Protocol Distribution</h3>
          <div className="space-y-4">
            {mockPositions.map((position, index) => {
              const percentage = (position.value / totalValue * 100).toFixed(1);

              return (
                <div key={position.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: position.color }}
                      />
                      <span className="text-sm font-medium text-white">{position.protocol}</span>
                    </div>
                    <span className="text-sm text-zinc-400">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      className="h-full"
                      style={{ backgroundColor: position.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Positions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-white">Active Positions</h3>

        {mockPositions.map((position, index) => (
          <motion.div
            key={position.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-white">{position.protocol}</h4>
                  <span className="px-2 py-1 rounded-md bg-zinc-800 text-xs text-zinc-400">
                    {position.type}
                  </span>
                  <ExternalLink className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-white" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-zinc-400 mb-1">Deposited</p>
                    <p className="text-white font-medium">${position.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 mb-1">Current Value</p>
                    <p className="text-white font-medium">${position.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 mb-1">APY</p>
                    <p className="text-green-400 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {position.apy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400 mb-1">Earnings</p>
                    <p className="text-green-400 font-medium">+${position.earnings}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
