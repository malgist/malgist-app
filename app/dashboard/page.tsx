'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Wallet,
  Lock,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import {
  DepositModal,
  WithdrawModal,
  RebalanceModal,
  PositionCard,
  PortfolioOverview,
  PortfolioPerformanceChart,
} from '@/features/portfolio/components';
import { usePortfolioData } from '@/features/portfolio/hooks';
import { TokenType } from '@/types';

export default function DashboardPage() {
  const { isConnected } = useAccount();
  const { positions, recentActivity, stats, rebalanceData } = usePortfolioData();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isRebalanceOpen, setIsRebalanceOpen] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const handleDeposit = (amount: number, token: TokenType, protocol?: string) => {
    console.log('Deposit:', amount, token, protocol);
  };

  const handleWithdraw = (amount: number, withdrawFrom: string) => {
    console.log('Withdraw:', amount, withdrawFrom);
  };

  const handleRebalance = () => {
    console.log('Rebalance portfolio');
  };

  const displayedActivity = showAllActivity ? recentActivity : recentActivity.slice(0, 3);

  // Empty state (no wallet connected)
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 mb-4 sm:mb-6">
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Welcome to Malgist</h1>

          <p className="text-base sm:text-lg md:text-xl text-[#a1a1a1] mb-6 sm:mb-8">
            Connect your wallet to access AI-powered DeFi strategies and portfolio management
          </p>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12">
            <div className="p-4 sm:p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Smart Strategies</h3>
              <p className="text-sm text-[#a1a1a1]">
                AI analyzes DeFi protocols to recommend optimal allocations based on your risk profile
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]">
              <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mb-2 sm:mb-3" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Portfolio Management</h3>
              <p className="text-sm text-[#a1a1a1]">
                Track performance, manage positions, and monitor your DeFi investments in one place
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Active portfolio state
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
      {/* Portfolio Stats Overview */}
      <PortfolioOverview />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3"
      >
        <button
          onClick={() => setIsDepositOpen(true)}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-xs sm:text-base font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all whitespace-nowrap"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Deposit</span>
        </button>

        <button
          onClick={() => setIsWithdrawOpen(true)}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 bg-[#1a1a1a] text-white border border-[#262626] rounded-xl text-xs sm:text-base font-medium hover:bg-[#262626] transition-all whitespace-nowrap"
        >
          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Withdraw</span>
        </button>

        <button
          onClick={() => setIsRebalanceOpen(true)}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 bg-[#1a1a1a] text-white border border-[#262626] rounded-xl text-xs sm:text-base font-medium hover:bg-[#262626] transition-all whitespace-nowrap"
        >
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Rebalance</span>
        </button>

        <Link
          href="/strategy"
          className="col-span-3 sm:col-span-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-linear-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm sm:text-base font-medium hover:from-indigo-600 hover:to-indigo-700 transition-all sm:ml-auto whitespace-nowrap"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          Create Strategy
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Link>
      </motion.div>

      {/* Portfolio Performance Chart & Donut */}
      <PortfolioPerformanceChart />

      {/* Positions & Recent Activity Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid lg:grid-cols-5 gap-4 lg:gap-6"
      >
        {/* Active Positions */}
        <div className="lg:col-span-3 rounded-2xl bg-[#1a1a1a] border border-[#262626] p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Active Positions</h3>
          <div className="space-y-3 sm:space-y-4">
            {positions.map((position) => (
              <PositionCard key={position.protocol} {...position} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-2xl bg-[#1a1a1a] border border-[#262626] p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">Recent Activity</h3>
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#a1a1a1]" />
          </div>

          <div className="space-y-3 sm:space-y-4">
            {displayedActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 sm:gap-3">
                <div className="mt-1">
                  {activity.type === 'deposit' && (
                    <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/10">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    </div>
                  )}
                  {activity.type === 'withdraw' && (
                    <div className="p-1.5 sm:p-2 rounded-lg bg-red-500/10">
                      <Upload className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                    </div>
                  )}
                  {activity.type === 'claim' && (
                    <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10">
                      <Wallet className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    </div>
                  )}
                  {activity.type === 'rebalance' && (
                    <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10">
                      <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-white capitalize">
                    {activity.type} {activity.amount > 0 && `$${activity.amount.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-[#a1a1a1] truncate">{activity.protocol}</p>
                  <p className="text-xs text-[#6b7280] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          {recentActivity.length > 3 && (
            <button
              onClick={() => setShowAllActivity(!showAllActivity)}
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              {showAllActivity ? (
                <>
                  Show Less <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                </>
              ) : (
                <>
                  Show All <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </motion.div>

      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onDeposit={handleDeposit}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onWithdraw={handleWithdraw}
        totalBalance={stats.totalBalance}
        positions={positions}
      />
      <RebalanceModal
        isOpen={isRebalanceOpen}
        onClose={() => setIsRebalanceOpen(false)}
        onRebalance={handleRebalance}
        currentAllocation={rebalanceData}
      />
    </div>
  );
}
