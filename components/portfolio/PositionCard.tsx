'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, TrendingUp, Shield, Zap } from 'lucide-react';

interface PositionCardProps {
  protocol: string;
  amount: number;
  percentage: number;
  apy: number;
  profit: number;
  profitPercentage: number;
  risk: 'low' | 'medium' | 'high';
  chain: string;
  tvl: string;
  since: string;
  onQuickWithdraw?: () => void;
  onAddMore?: () => void;
}

export function PositionCard({
  protocol,
  amount,
  percentage,
  apy,
  profit,
  profitPercentage,
  risk,
  chain,
  tvl,
  since,
  onQuickWithdraw,
  onAddMore,
}: PositionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskColor = () => {
    switch (risk) {
      case 'low':
        return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', icon: Shield };
      case 'medium':
        return { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: TrendingUp };
      case 'high':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: Zap };
    }
  };

  const riskConfig = getRiskColor();
  const RiskIcon = riskConfig.icon;

  // Mock mini chart data
  const miniChartPoints = [20, 25, 22, 28, 30, 27, 32, 35, 33, 38, 40, 42];

  return (
    <motion.div
      layout
      className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors"
    >
      {/* Collapsed View */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between gap-4 text-left"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Risk Indicator */}
          <div className={`p-2 rounded-lg ${riskConfig.bg} border ${riskConfig.border}`}>
            <RiskIcon className={`w-5 h-5 ${riskConfig.text}`} />
          </div>

          {/* Protocol Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{protocol}</h3>
            <p className="text-sm text-zinc-400">
              ${amount.toLocaleString()} ({percentage}%)
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-zinc-400">APY</p>
            <p className="font-semibold text-green-400">{apy}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">Profit</p>
            <p className={`font-semibold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              +${profit.toLocaleString()}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-zinc-400"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-zinc-800">
              {/* Mini Performance Chart */}
              <div className="pt-4">
                <p className="text-sm font-medium text-zinc-300 mb-3">7-Day Performance</p>
                <div className="h-24 flex items-end gap-1">
                  {miniChartPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-green-500/50 to-green-400/30 rounded-t"
                      style={{ height: `${(point / Math.max(...miniChartPoints)) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-zinc-500">
                  <span>7 days ago</span>
                  <span className="text-green-400">+{profitPercentage}%</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-zinc-800">
                  <p className="text-xs text-zinc-400 mb-1">Protocol TVL</p>
                  <p className="text-sm font-semibold text-white">{tvl}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800">
                  <p className="text-xs text-zinc-400 mb-1">Chain</p>
                  <p className="text-sm font-semibold text-white">{chain}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800">
                  <p className="text-xs text-zinc-400 mb-1">Risk Level</p>
                  <p className={`text-sm font-semibold ${riskConfig.text} capitalize`}>{risk}</p>
                </div>
                <div className="p-3 rounded-lg bg-zinc-800">
                  <p className="text-xs text-zinc-400 mb-1">Since</p>
                  <p className="text-sm font-semibold text-white">{since}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onQuickWithdraw}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                >
                  Withdraw
                </button>
                <button
                  onClick={onAddMore}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 font-medium border border-indigo-500/30 transition-colors"
                >
                  Add More
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
