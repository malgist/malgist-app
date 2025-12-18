'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, TrendingUp, AlertTriangle } from 'lucide-react';

interface RebalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRebalance: () => void;
  currentAllocation: Array<{ protocol: string; current: number; target: number; apy: number }>;
}

export function RebalanceModal({ isOpen, onClose, onRebalance, currentAllocation }: RebalanceModalProps) {
  const needsRebalancing = currentAllocation.some((item) => Math.abs(item.current - item.target) > 1);

  const handleRebalance = () => {
    onRebalance();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-zinc-800 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <RefreshCw className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Rebalance Portfolio</h2>
                    <p className="text-sm text-zinc-400 mt-1">Adjust allocations to match your target strategy</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Status */}
                {needsRebalancing ? (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-400">Rebalancing recommended</p>
                      <p className="text-xs text-yellow-400/80 mt-1">
                        Your current allocation differs from your target strategy
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-400">Portfolio is balanced</p>
                      <p className="text-xs text-green-400/80 mt-1">
                        Your allocation matches your target strategy
                      </p>
                    </div>
                  </div>
                )}

                {/* Allocation Comparison */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Current vs Target Allocation</h3>
                  {currentAllocation.map((item) => {
                    const difference = item.current - item.target;
                    const needsAdjustment = Math.abs(difference) > 1;

                    return (
                      <div key={item.protocol} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-white">{item.protocol}</span>
                            <span className="text-sm text-zinc-400 ml-2">{item.apy}% APY</span>
                          </div>
                          {needsAdjustment && (
                            <span
                              className={`text-sm font-medium ${
                                difference > 0 ? 'text-red-400' : 'text-green-400'
                              }`}
                            >
                              {difference > 0 ? '-' : '+'}
                              {Math.abs(difference).toFixed(1)}%
                            </span>
                          )}
                        </div>

                        {/* Visual comparison bars */}
                        <div className="space-y-1.5">
                          {/* Current */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 w-16">Current</span>
                            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.current}%` }}
                                className="h-full bg-zinc-600 rounded-full"
                              />
                            </div>
                            <span className="text-xs text-zinc-400 w-12 text-right">{item.current}%</span>
                          </div>

                          {/* Target */}
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 w-16">Target</span>
                            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.target}%` }}
                                className={`h-full rounded-full ${
                                  needsAdjustment ? 'bg-indigo-500' : 'bg-green-500'
                                }`}
                              />
                            </div>
                            <span className="text-xs text-zinc-400 w-12 text-right">{item.target}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimated Info */}
                <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">Estimated transactions</span>
                    <span className="text-sm font-medium text-white">
                      {currentAllocation.filter((item) => Math.abs(item.current - item.target) > 1).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">Est. Total Gas Fees</span>
                    <span className="text-sm font-medium text-white">~$5.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Expected APY after rebalance</span>
                    <span className="text-sm font-medium text-green-400">8.5%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRebalance}
                    disabled={!needsRebalancing}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    {needsRebalancing ? 'Rebalance Now' : 'Already Balanced'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
