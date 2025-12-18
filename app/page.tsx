'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
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
import { DepositModal } from '@/components/portfolio/DepositModal';
import { WithdrawModal } from '@/components/portfolio/WithdrawModal';
import { RebalanceModal } from '@/components/portfolio/RebalanceModal';
import { PositionCard } from '@/components/portfolio/PositionCard';
import { TokenType } from '@/types';

// Mock data
const mockPositions = [
  {
    protocol: 'Aave V3',
    amount: 50000,
    percentage: 40,
    apy: 5.2,
    profit: 2500,
    profitPercentage: 5.0,
    risk: 'low' as const,
    chain: 'Ethereum',
    tvl: '$8.2B',
    since: 'Jan 15, 2024',
  },
  {
    protocol: 'Lido',
    amount: 43750,
    percentage: 35,
    apy: 4.8,
    profit: 2100,
    profitPercentage: 4.8,
    risk: 'low' as const,
    chain: 'Ethereum',
    tvl: '$14.5B',
    since: 'Jan 15, 2024',
  },
  {
    protocol: 'GMX',
    amount: 31250,
    percentage: 25,
    apy: 28.5,
    profit: 7125,
    profitPercentage: 22.8,
    risk: 'high' as const,
    chain: 'Arbitrum',
    tvl: '$1.2B',
    since: 'Jan 15, 2024',
  },
];

const mockRecentActivity = [
  { type: 'deposit', protocol: 'Aave V3', amount: 10000, time: '2 hours ago', txHash: '0x123...' },
  { type: 'claim', protocol: 'Lido', amount: 125, time: '1 day ago', txHash: '0x456...' },
  { type: 'rebalance', protocol: 'Portfolio', amount: 0, time: '3 days ago', txHash: '0x789...' },
  { type: 'withdraw', protocol: 'GMX', amount: 5000, time: '5 days ago', txHash: '0xabc...' },
  { type: 'deposit', protocol: 'Compound', amount: 15000, time: '7 days ago', txHash: '0xdef...' },
];

export default function Home() {
  const { isConnected } = useAccount();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isRebalanceOpen, setIsRebalanceOpen] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1W');

  // Calculate totals
  const totalBalance = mockPositions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalProfit = mockPositions.reduce((sum, pos) => sum + pos.profit, 0);
  const totalProfitPercentage = (totalProfit / totalBalance) * 100;
  const avgApy = mockPositions.reduce((sum, pos) => sum + pos.apy * pos.percentage, 0) / 100;
  const dayChange = 2340;
  const dayChangePercentage = 1.87;

  const handleDeposit = (amount: number, token: TokenType, protocol?: string) => {
    console.log('Deposit:', amount, token, protocol);
  };

  const handleWithdraw = (amount: number, withdrawFrom: string) => {
    console.log('Withdraw:', amount, withdrawFrom);
  };

  const handleRebalance = () => {
    console.log('Rebalance portfolio');
  };

  const rebalanceData = mockPositions.map((pos) => ({
    protocol: pos.protocol,
    current: pos.percentage,
    target: pos.percentage,
    apy: pos.apy,
  }));

  const displayedActivity = showAllActivity ? mockRecentActivity : mockRecentActivity.slice(0, 3);

  // Empty state (no wallet connected)
  if (!isConnected) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Malgist</h1>

            <p className="text-xl text-[#a1a1a1] mb-8">
              Connect your wallet to access AI-powered DeFi strategies and portfolio management
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-12">
              <div className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]">
                <TrendingUp className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Smart Strategies</h3>
                <p className="text-sm text-[#a1a1a1]">
                  AI analyzes DeFi protocols to recommend optimal allocations based on your risk profile
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]">
                <Wallet className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Portfolio Management</h3>
                <p className="text-sm text-[#a1a1a1]">
                  Track performance, manage positions, and monitor your DeFi investments in one place
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  // Active portfolio state
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Hero Stats - Enhanced with 24h Change */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/10 to-emerald-500/10 border border-emerald-500/20"
          >
            <p className="text-sm text-[#a1a1a1] mb-2">Total Portfolio Value</p>
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-4xl font-bold text-white">${totalBalance.toLocaleString()}</h2>
              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg font-semibold">+{totalProfitPercentage.toFixed(2)}%</span>
              </div>
            </div>
            <p className="text-sm text-[#a1a1a1]">
              Total Profit: <span className="text-green-400 font-medium">+${totalProfit.toLocaleString()}</span>
            </p>
          </motion.div>

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
            <p className="text-3xl font-bold text-green-400">+${dayChange.toLocaleString()}</p>
            <p className="text-sm text-green-400 mt-1">+{dayChangePercentage}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#262626]"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#a1a1a1]" />
              <p className="text-sm text-[#a1a1a1]">Avg APY</p>
            </div>
            <p className="text-3xl font-bold text-white">{avgApy.toFixed(1)}%</p>
            <p className="text-sm text-[#a1a1a1] mt-1">{mockPositions.length} protocols</p>
          </motion.div>
        </div>

        {/* Quick Actions - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-4"
        >
          <button
            onClick={() => setIsDepositOpen(true)}
            className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/10 border-2 border-emerald-500/30 hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <Download className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Deposit
                </h4>
                <p className="text-sm text-[#a1a1a1]">Add funds</p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => setIsWithdrawOpen(true)}
            className="p-5 rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 hover:border-red-500 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <Upload className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors">
                  Withdraw
                </h4>
                <p className="text-sm text-[#a1a1a1]">Remove funds</p>
              </div>
              <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={() => setIsRebalanceOpen(true)}
            className="p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/10 border-2 border-emerald-500/30 hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/20">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  Rebalance
                </h4>
                <p className="text-sm text-[#a1a1a1]">Adjust allocations</p>
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* Portfolio Chart - Collapsible with Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-[#1a1a1a] border border-[#262626] overflow-hidden"
        >
          <button
            onClick={() => setShowChart(!showChart)}
            className="w-full p-4 flex items-center justify-between hover:bg-[#262626]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
            </div>
            {showChart ? (
              <ChevronUp className="w-5 h-5 text-[#a1a1a1]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#a1a1a1]" />
            )}
          </button>

          <AnimatePresence>
            {showChart && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-[#262626]"
              >
                <div className="p-6">
                  {/* Timeframe Selector */}
                  <div className="flex justify-end gap-2 mb-4">
                    {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedTimeframe(period)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                          selectedTimeframe === period
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#262626] text-[#a1a1a1] hover:text-white'
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="relative h-64">
                    <div className="absolute inset-0 flex items-end">
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0,240 L 80,220 L 160,200 L 240,190 L 320,180 L 400,160 L 480,150 L 560,140 L 640,120 L 720,100 L 800,80 L 880,60 L 960,40 L 1024,20 L 1024,256 L 0,256 Z"
                          fill="url(#chartGradient)"
                        />
                        <path
                          d="M 0,240 L 80,220 L 160,200 L 240,190 L 320,180 L 400,160 L 480,150 L 560,140 L 640,120 L 720,100 L 800,80 L 880,60 L 960,40 L 1024,20"
                          stroke="rgb(99, 102, 241)"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-[#6b7280] mt-2">
                      <span>Jan 1</span>
                      <span>Jan 15</span>
                      <span>Feb 1</span>
                    </div>
                  </div>

                  {/* Chart Summary */}
                  <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-[#262626]">
                    <div className="text-center">
                      <p className="text-sm text-[#a1a1a1] mb-1">Current Value</p>
                      <p className="text-2xl font-bold text-white">${totalBalance.toLocaleString()}</p>
                    </div>
                    <div className="w-px h-12 bg-[#262626]" />
                    <div className="text-center">
                      <p className="text-sm text-[#a1a1a1] mb-1">Period Change</p>
                      <p className="text-2xl font-bold text-green-400">+{dayChangePercentage}%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Active Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Positions</h3>
            <span className="text-sm text-[#a1a1a1]">{mockPositions.length} protocols</span>
          </div>
          <div className="space-y-3">
            {mockPositions.map((position, index) => (
              <motion.div
                key={position.protocol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <PositionCard
                  {...position}
                  onQuickWithdraw={() => setIsWithdrawOpen(true)}
                  onAddMore={() => setIsDepositOpen(true)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity - Expandable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#262626]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            {mockRecentActivity.length > 3 && (
              <button
                onClick={() => setShowAllActivity(!showAllActivity)}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                {showAllActivity ? 'Show Less' : `View All (${mockRecentActivity.length})`}
                {showAllActivity ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {displayedActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#262626] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      activity.type === 'deposit'
                        ? 'bg-emerald-500/10'
                        : activity.type === 'withdraw'
                        ? 'bg-red-500/10'
                        : activity.type === 'rebalance'
                        ? 'bg-emerald-500/10'
                        : 'bg-green-500/10'
                    }`}
                  >
                    {activity.type === 'deposit' ? (
                      <Download className="w-4 h-4 text-emerald-400" />
                    ) : activity.type === 'withdraw' ? (
                      <Upload className="w-4 h-4 text-red-400" />
                    ) : activity.type === 'rebalance' ? (
                      <RefreshCw className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white capitalize">
                      {activity.type === 'claim' ? 'Claimed rewards' : `${activity.type}ed`}{' '}
                      {activity.amount > 0 && `$${activity.amount.toLocaleString()}`}{' '}
                      {activity.type !== 'rebalance' && (
                        <span className="text-[#a1a1a1]">
                          {activity.type === 'deposit' ? 'to' : 'from'} {activity.protocol}
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-[#6b7280]" />
                      <p className="text-xs text-[#6b7280]">{activity.time}</p>
                    </div>
                  </div>
                </div>
                <button className="text-[#6b7280] hover:text-[#a1a1a1] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Create Strategy CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/strategy">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/10 border-2 border-emerald-500/30 hover:border-emerald-500 transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/20">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      Want to optimize your strategy?
                    </h3>
                    <p className="text-sm text-[#a1a1a1] mt-1">
                      Get AI-powered recommendations to maximize your returns
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Modals */}
        <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} onDeposit={handleDeposit} />
        <WithdrawModal
          isOpen={isWithdrawOpen}
          onClose={() => setIsWithdrawOpen(false)}
          onWithdraw={handleWithdraw}
          totalBalance={totalBalance}
          positions={mockPositions.map((p) => ({ protocol: p.protocol, amount: p.amount, apy: p.apy }))}
        />
        <RebalanceModal
          isOpen={isRebalanceOpen}
          onClose={() => setIsRebalanceOpen(false)}
          onRebalance={handleRebalance}
          currentAllocation={rebalanceData}
        />
      </div>
    </DashboardLayout>
  );
}
