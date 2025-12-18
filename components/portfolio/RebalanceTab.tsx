'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

const currentAllocations = [
  { protocol: 'Aave V3', current: 32, target: 30, difference: -2, color: '#6366f1' },
  { protocol: 'Lido', current: 30, target: 35, difference: +5, color: '#8b5cf6' },
  { protocol: 'Yearn Finance', current: 24, target: 25, difference: +1, color: '#ec4899' },
  { protocol: 'Compound', current: 14, target: 10, difference: -4, color: '#14b8a6' },
];

export function RebalanceTab() {
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [rebalanceSuccess, setRebalanceSuccess] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const needsRebalance = currentAllocations.some(a => Math.abs(a.difference) >= 2);

  const handleRebalance = async () => {
    setIsRebalancing(true);

    // Simulate rebalancing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsRebalancing(false);
    setRebalanceSuccess(true);

    setTimeout(() => {
      setRebalanceSuccess(false);
    }, 3000);
  };

  const handleAIRebalance = async () => {
    setShowAI(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl border-2 ${
          needsRebalance
            ? 'bg-yellow-500/10 border-yellow-500/20'
            : 'bg-green-500/10 border-green-500/20'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg ${
            needsRebalance ? 'bg-yellow-500/20' : 'bg-green-500/20'
          } flex items-center justify-center`}>
            {needsRebalance ? (
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            ) : (
              <TrendingUp className="w-6 h-6 text-green-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {needsRebalance ? 'Rebalancing Recommended' : 'Portfolio Balanced'}
            </h3>
            <p className="text-sm text-zinc-400">
              {needsRebalance
                ? 'Your current allocation deviates from your target strategy. Rebalance to optimize returns.'
                : 'Your portfolio allocation matches your target strategy.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Current vs Target Allocations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Allocation Comparison</h3>

        <div className="space-y-6">
          {currentAllocations.map((allocation, index) => (
            <motion.div
              key={allocation.protocol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: allocation.color }}
                  />
                  <span className="font-medium text-white">{allocation.protocol}</span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="text-zinc-400">Current</p>
                    <p className="text-white font-semibold">{allocation.current}%</p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-600" />

                  <div className="text-right">
                    <p className="text-zinc-400">Target</p>
                    <p className="text-white font-semibold">{allocation.target}%</p>
                  </div>

                  <div className={`px-2 py-1 rounded-md ${
                    allocation.difference > 0
                      ? 'bg-green-500/10 text-green-400'
                      : allocation.difference < 0
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {allocation.difference > 0 && '+'}
                    {allocation.difference}%
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${allocation.current}%`,
                        backgroundColor: allocation.color,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all opacity-50"
                      style={{
                        width: `${allocation.target}%`,
                        backgroundColor: allocation.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleRebalance}
          disabled={!needsRebalance || isRebalancing || rebalanceSuccess}
          className="p-6 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold transition-all flex flex-col items-center gap-2"
        >
          {isRebalancing ? (
            <>
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Rebalancing Portfolio...
            </>
          ) : rebalanceSuccess ? (
            <>
              <TrendingUp className="w-6 h-6" />
              Rebalance Complete!
            </>
          ) : (
            <>
              <RefreshCw className="w-6 h-6" />
              Rebalance Now
            </>
          )}
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleAIRebalance}
          className="p-6 rounded-xl bg-zinc-900 border-2 border-zinc-800 hover:border-indigo-500 text-white font-semibold transition-all flex flex-col items-center gap-2 group"
        >
          <Sparkles className="w-6 h-6 text-indigo-400" />
          AI Optimize Strategy
        </motion.button>
      </div>

      {/* AI Recommendation */}
      {showAI && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
        >
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <h4 className="text-base font-semibold text-white mb-2">AI Recommendation</h4>
              <p className="text-sm text-zinc-300 mb-4">
                Based on current market conditions and protocol performance, the AI suggests maintaining your current balanced strategy with minor adjustments to maximize yield while managing risk exposure.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">•</span>
                  <span className="text-zinc-300">Increase Lido allocation by 5% to capture higher staking rewards</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">•</span>
                  <span className="text-zinc-300">Reduce Compound exposure to maintain balanced risk</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-indigo-400">•</span>
                  <span className="text-zinc-300">Expected APY improvement: +2.3%</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full p-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors">
            Apply AI Recommendation
          </button>
        </motion.div>
      )}

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-lg bg-zinc-900 border border-zinc-800"
      >
        <p className="text-sm text-zinc-400">
          <strong className="text-white">Note:</strong> Rebalancing may incur gas fees and trigger taxable events. Review changes carefully before proceeding.
        </p>
      </motion.div>
    </div>
  );
}
