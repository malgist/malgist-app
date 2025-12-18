'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, TrendingUp, Shield, Zap, Users, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StrategyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: {
    rank: number;
    user: {
      address: string;
      username?: string;
      isVerified?: boolean;
    };
    strategy: {
      name: string;
      protocols: string[];
    };
    performance: {
      apy: number;
      profit: number;
      roi: number;
      tvl: number;
    };
    riskLevel: 'low' | 'medium' | 'high';
  };
}

export function StrategyDetailModal({ isOpen, onClose, strategy }: StrategyDetailModalProps) {
  const router = useRouter();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(strategy.user.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleApplyStrategy = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      onClose();
      router.push('/?applied=true');
    }, 1500);
  };

  const getRiskConfig = (risk: 'low' | 'medium' | 'high') => {
    const config = {
      low: {
        icon: Shield,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        label: 'Low Risk',
      },
      medium: {
        icon: TrendingUp,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        label: 'Medium Risk',
      },
      high: { icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'High Risk' },
    };
    return config[risk];
  };

  const riskConfig = getRiskConfig(strategy.riskLevel);
  const RiskIcon = riskConfig.icon;

  // Mock allocation data
  const mockAllocations = [
    { protocol: strategy.strategy.protocols[0], percentage: 40, apy: 5.2 },
    { protocol: strategy.strategy.protocols[1], percentage: 35, apy: 8.5 },
    { protocol: strategy.strategy.protocols[2], percentage: 25, apy: 12.8 },
  ];

  // Mock historical performance
  const mockHistory = [
    { month: 'Oct', apy: 18.2 },
    { month: 'Nov', apy: 21.5 },
    { month: 'Dec', apy: 23.8 },
    { month: 'Jan', apy: strategy.performance.apy },
  ];

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
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden my-8"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-zinc-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white">{strategy.strategy.name}</h2>
                      <div className={`px-3 py-1 rounded-full ${riskConfig.bg} border ${riskConfig.border}`}>
                        <div className="flex items-center gap-1.5">
                          <RiskIcon className={`w-4 h-4 ${riskConfig.color}`} />
                          <span className={`text-sm font-medium ${riskConfig.color}`}>{riskConfig.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-zinc-400">by</span>
                      <span className="font-medium text-white">{strategy.user.username}</span>
                      <button onClick={handleCopyAddress} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                        <span>{strategy.user.address}</span>
                        {copiedAddress ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-400 mb-1">Rank</div>
                    <div className="text-3xl font-bold text-white">#{strategy.rank}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Performance Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-zinc-400">APY</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{strategy.performance.apy}%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span className="text-sm text-zinc-400">Total Profit</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${(strategy.performance.profit / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-zinc-400">TVL</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${(strategy.performance.tvl / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-zinc-400">ROI</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{strategy.performance.roi}%</p>
                  </div>
                </div>

                {/* Fee Structure */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Performance Fee Structure</h3>
                      <p className="text-sm text-zinc-400 mb-3">
                        When you copy this strategy, the creator earns a percentage of your profits
                      </p>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-sm text-zinc-400">Creator Fee:</span>
                          <span className="ml-2 text-xl font-bold text-indigo-400">10%</span>
                          <span className="ml-1 text-sm text-zinc-500">of profits</span>
                        </div>
                        <div className="w-px h-8 bg-zinc-700" />
                        <div>
                          <span className="text-sm text-zinc-400">Your Profit:</span>
                          <span className="ml-2 text-xl font-bold text-green-400">90%</span>
                          <span className="ml-1 text-sm text-zinc-500">of gains</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-indigo-500/20">
                      <Users className="w-8 h-8 text-indigo-400" />
                    </div>
                  </div>
                </div>

                {/* Strategy Allocation */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
                  <div className="space-y-3">
                    {mockAllocations.map((alloc) => (
                      <div key={alloc.protocol} className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-white">{alloc.protocol}</span>
                            <span className="text-sm text-zinc-400">{alloc.apy}% APY</span>
                          </div>
                          <span className="text-lg font-bold text-white">{alloc.percentage}%</span>
                        </div>
                        <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${alloc.percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historical Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">4-Month Performance</h3>
                  <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                    <div className="flex items-end justify-between gap-2 h-32">
                      {mockHistory.map((item, index) => (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.apy / Math.max(...mockHistory.map((h) => h.apy))) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full bg-gradient-to-t from-green-500/50 to-green-400/30 rounded-t min-h-[20px]"
                          />
                          <div className="text-center">
                            <div className="text-xs text-zinc-500">{item.month}</div>
                            <div className="text-sm font-medium text-green-400">{item.apy}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strategy Followers */}
                <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="font-medium text-white">287 Active Followers</p>
                        <p className="text-sm text-zinc-400">Currently copying this strategy</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                      View Creator Profile
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyStrategy}
                    disabled={isApplying}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isApplying ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Applying...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Copy This Strategy
                      </>
                    )}
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
