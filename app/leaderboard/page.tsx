'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  TrendingUp,
  Users,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Minus,
  ExternalLink,
  Star,
  Shield,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { StrategyDetailModal } from '@/features/leaderboard/components';
import { useRouter } from 'next/navigation';
import { generateAvatar } from '@/lib/utils/avatar';
import Image from 'next/image';

// Mock leaderboard data
interface LeaderboardEntry {
  rank: number;
  previousRank?: number;
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
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    previousRank: 2,
    user: {
      address: '0x742d...4e8a',
      username: 'DeFiWhale',
      isVerified: true,
    },
    strategy: {
      name: 'Conservative Staking',
      protocols: ['Lido', 'Aave', 'Compound'],
    },
    performance: {
      apy: 28.5,
      profit: 125000,
      roi: 285,
      tvl: 500000,
    },
    riskLevel: 'low',
  },
  {
    rank: 2,
    previousRank: 1,
    user: {
      address: '0x8f3c...2b9d',
      username: 'YieldMaster',
      isVerified: true,
    },
    strategy: {
      name: 'Balanced Growth',
      protocols: ['GMX', 'Pendle', 'Morpho'],
    },
    performance: {
      apy: 26.8,
      profit: 98500,
      roi: 268,
      tvl: 380000,
    },
    riskLevel: 'medium',
  },
  {
    rank: 3,
    previousRank: 3,
    user: {
      address: '0xa1b2...7c3f',
      username: 'SmartInvestor',
    },
    strategy: {
      name: 'High Yield Farming',
      protocols: ['Convex', 'Rocket Pool', 'Beefy'],
    },
    performance: {
      apy: 24.2,
      profit: 72000,
      roi: 242,
      tvl: 298000,
    },
    riskLevel: 'medium',
  },
  {
    rank: 4,
    previousRank: 5,
    user: {
      address: '0x5e7d...9a1c',
      username: 'CryptoNinja',
      isVerified: true,
    },
    strategy: {
      name: 'Aggressive DeFi',
      protocols: ['Gains Network', 'Aura', 'GMX'],
    },
    performance: {
      apy: 22.5,
      profit: 58000,
      roi: 225,
      tvl: 258000,
    },
    riskLevel: 'high',
  },
  {
    rank: 5,
    previousRank: 4,
    user: {
      address: '0x9c8b...4d2e',
      username: 'StableYield',
    },
    strategy: {
      name: 'Safe & Steady',
      protocols: ['Aave', 'Compound', 'Yearn'],
    },
    performance: {
      apy: 21.8,
      profit: 52000,
      roi: 218,
      tvl: 240000,
    },
    riskLevel: 'low',
  },
  {
    rank: 6,
    previousRank: 7,
    user: {
      address: '0x2f4a...6b8c',
      username: 'DegenKing',
    },
    strategy: {
      name: 'Max APY Hunter',
      protocols: ['Pendle', 'GMX', 'Morpho'],
    },
    performance: {
      apy: 20.5,
      profit: 45000,
      roi: 205,
      tvl: 220000,
    },
    riskLevel: 'high',
  },
  {
    rank: 7,
    previousRank: 6,
    user: {
      address: '0x7d3e...5f9a',
      username: 'ProtocolPro',
      isVerified: true,
    },
    strategy: {
      name: 'Diversified Mix',
      protocols: ['Lido', 'Convex', 'Rocket Pool'],
    },
    performance: {
      apy: 19.2,
      profit: 38000,
      roi: 192,
      tvl: 198000,
    },
    riskLevel: 'medium',
  },
  {
    rank: 8,
    previousRank: 9,
    user: {
      address: '0x4b6c...8e2d',
      username: 'YieldOptimizer',
    },
    strategy: {
      name: 'Smart Allocation',
      protocols: ['Aave', 'Beefy', 'Yearn'],
    },
    performance: {
      apy: 18.5,
      profit: 32000,
      roi: 185,
      tvl: 173000,
    },
    riskLevel: 'low',
  },
  {
    rank: 9,
    previousRank: 8,
    user: {
      address: '0x6a9f...3c7b',
      username: 'StrategyMaster',
    },
    strategy: {
      name: 'Balanced Portfolio',
      protocols: ['Compound', 'Morpho', 'Convex'],
    },
    performance: {
      apy: 17.8,
      profit: 28000,
      roi: 178,
      tvl: 157000,
    },
    riskLevel: 'medium',
  },
  {
    rank: 10,
    previousRank: 11,
    user: {
      address: '0x8e5d...2a4f',
      username: 'SafeHands',
    },
    strategy: {
      name: 'Conservative Growth',
      protocols: ['Lido', 'Aave', 'Compound'],
    },
    performance: {
      apy: 16.5,
      profit: 24000,
      roi: 165,
      tvl: 145000,
    },
    riskLevel: 'low',
  },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<LeaderboardEntry | null>(null);

  const filteredData = useMemo(() => {
    return mockLeaderboardData.filter((entry) => {
      const matchesSearch =
        entry.user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.strategy.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRisk = riskFilter === 'all' || entry.riskLevel === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [searchQuery, riskFilter]);

  const getRankChange = (rank: number, previousRank?: number) => {
    if (!previousRank) return null;
    const change = previousRank - rank;
    if (change > 0)
      return (
        <div className="flex items-center gap-1 text-green-400">
          <ChevronUp className="w-4 h-4" />
          <span className="text-xs font-medium">{change}</span>
        </div>
      );
    if (change < 0)
      return (
        <div className="flex items-center gap-1 text-red-400">
          <ChevronDown className="w-4 h-4" />
          <span className="text-xs font-medium">{Math.abs(change)}</span>
        </div>
      );
    return (
      <div className="flex items-center text-zinc-500">
        <Minus className="w-4 h-4" />
      </div>
    );
  };

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    const config = {
      low: { icon: Shield, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
      medium: { icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
      high: { icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    };

    const { icon: Icon, color, bg, border } = config[risk];

    return (
      <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${bg} border ${border}`}>
        <Icon className={`w-3 h-3 ${color}`} />
        <span className={`text-xs font-medium ${color} capitalize`}>{risk}</span>
      </div>
    );
  };

  const handleCopyAddress = (address: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const getPodiumHeight = (rank: number) => {
    if (rank === 1) return 'min-h-[280px]';
    if (rank === 2) return 'min-h-[260px]';
    return 'min-h-[260px]';
  };

  const getPodiumColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50';
    if (rank === 2) return 'from-gray-400/20 to-gray-500/20 border-gray-400/50';
    return 'from-orange-700/20 to-orange-800/20 border-orange-700/50';
  };

  const handleViewProfile = (address: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    router.push(`/profile/${address}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Leaderboard
            </h1>
            <p className="text-[#a1a1a1]">Top 10 performing DeFi strategies - Click to copy and apply</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#262626]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-[#a1a1a1]">Active Strategists</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#262626]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-green-500/10">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-[#a1a1a1]">Avg Top 10 APY</p>
                <p className="text-2xl font-bold text-white">21.6%</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#262626]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10">
                <Trophy className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-[#a1a1a1]">Total TVL</p>
                <p className="text-2xl font-bold text-white">$2.4M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-4">
          {filteredData.slice(0, 3).map((entry) => {
            const podiumOrder = entry.rank === 1 ? 2 : entry.rank === 2 ? 1 : 3;
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: entry.rank * 0.1 }}
                className={`order-${podiumOrder}`}
              >
                <div
                  onClick={() => setSelectedStrategy(entry)}
                  className={`p-4 md:p-6 rounded-xl bg-gradient-to-br ${getPodiumColor(
                    entry.rank
                  )} border-2 ${getPodiumHeight(entry.rank)} flex flex-col justify-between overflow-hidden cursor-pointer hover:border-emerald-500 transition-all`}
                >
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className="relative">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white/10">
                          <Image
                            src={generateAvatar(entry.user.address, 'adventurer')}
                            alt={entry.user.username || 'User'}
                            width={80}
                            height={80}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          {entry.rank === 1 ? (
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-500 flex items-center justify-center border-2 border-[#0a0a0a]">
                              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                          ) : entry.rank === 2 ? (
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-400 flex items-center justify-center border-2 border-[#0a0a0a]">
                              <Medal className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-orange-700 flex items-center justify-center border-2 border-[#0a0a0a]">
                              <Medal className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-base md:text-lg font-bold text-white mb-1 flex items-center justify-center gap-2 px-2">
                      <span className="truncate max-w-[150px]">{entry.user.username}</span>
                      {entry.user.isVerified && <Star className="w-4 h-4 text-blue-400 fill-blue-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs md:text-sm text-[#a1a1a1] mb-2 md:mb-3 px-2 line-clamp-2 min-h-[2.5rem]">
                      {entry.strategy.name}
                    </p>
                    <div className="text-2xl md:text-3xl font-bold text-green-400">{entry.performance.apy}%</div>
                    <p className="text-xs text-[#6b7280]">APY</p>
                  </div>
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm mt-3">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[#a1a1a1] flex-shrink-0">Profit</span>
                      <span className="text-white font-medium truncate">
                        ${(entry.performance.profit / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[#a1a1a1] flex-shrink-0">TVL</span>
                      <span className="text-white font-medium truncate">
                        ${(entry.performance.tvl / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1a1]" />
            <input
              type="text"
              placeholder="Search by username or strategy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#262626] rounded-xl text-white placeholder-[#6b7280] focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#a1a1a1]" />
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="px-4 py-3 bg-[#1a1a1a] border border-[#262626] rounded-xl text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="rounded-xl bg-[#1a1a1a] border border-[#262626] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#262626]/50">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">Rank</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">User</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">Strategy</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">APY</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">Profit</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">TVL</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300">Risk</th>
                  <th className="px-6 py-4 text-sm font-semibold text-zinc-300"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
                  <motion.tr
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedStrategy(entry)}
                    className="border-t border-[#262626] hover:bg-[#262626]/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white w-6">#{entry.rank}</span>
                        {getRankChange(entry.rank, entry.previousRank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/10">
                          <Image
                            src={generateAvatar(entry.user.address, 'adventurer')}
                            alt={entry.user.username || 'User'}
                            width={40}
                            height={40}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white">{entry.user.username}</span>
                            {entry.user.isVerified && <Star className="w-4 h-4 text-blue-400 fill-blue-400" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-[#a1a1a1]">{entry.user.address}</span>
                            <button
                              onClick={(e) => handleCopyAddress(entry.user.address, e)}
                              className="text-[#6b7280] hover:text-white transition-colors"
                            >
                              {copiedAddress === entry.user.address ? (
                                <Check className="w-3 h-3 text-green-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white mb-1">{entry.strategy.name}</div>
                        <div className="flex gap-1 flex-wrap">
                          {entry.strategy.protocols.map((protocol) => (
                            <span key={protocol} className="text-xs px-2 py-0.5 rounded bg-[#262626] text-[#a1a1a1]">
                              {protocol}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-green-400">{entry.performance.apy}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">${(entry.performance.profit / 1000).toFixed(1)}K</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">${(entry.performance.tvl / 1000).toFixed(0)}K</span>
                    </td>
                    <td className="px-6 py-4">{getRiskBadge(entry.riskLevel)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => handleViewProfile(entry.user.address, e)}
                        className="p-2 rounded-xl hover:bg-[#262626] transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 text-[#a1a1a1] group-hover:text-white" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#a1a1a1]">No strategies found matching your criteria</p>
          </div>
        )}

        {/* Strategy Detail Modal */}
        {selectedStrategy && (
          <StrategyDetailModal
            isOpen={!!selectedStrategy}
            onClose={() => setSelectedStrategy(null)}
            strategy={selectedStrategy}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
