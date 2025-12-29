'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Calendar,
  Shield,
  Zap,
  Copy,
  Check,
  ExternalLink,
  Star,
  Award,
  Sparkles,
  Camera,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generateAvatar, type AvatarStyle } from '@/lib/utils/avatar';
import { AvatarSelector } from '@/features/profile/components';

export default function ProfilePage({ params }: { params: { address: string } }) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  // Initialize avatar preferences from localStorage
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`avatar-style-${params.address}`);
      return (saved as AvatarStyle) || 'adventurer';
    }
    return 'adventurer';
  });

  const [avatarSeed, setAvatarSeed] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`avatar-seed-${params.address}`);
      return saved || params.address;
    }
    return params.address;
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(params.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSaveAvatar = (style: AvatarStyle, seed: string) => {
    setAvatarStyle(style);
    setAvatarSeed(seed);

    // Save to localStorage
    localStorage.setItem(`avatar-style-${params.address}`, style);
    localStorage.setItem(`avatar-seed-${params.address}`, seed);
  };

  // Mock profile data
  const profileData = {
    user: {
      address: params.address,
      username: 'DeFiWhale',
      isVerified: true,
      joinedDate: 'January 2024',
      bio: 'Professional DeFi strategist with 5+ years of experience. Focused on low-risk, high-yield strategies.',
    },
    stats: {
      totalFollowers: 287,
      totalStrategies: 3,
      totalRevenue: 12500,
      averageApy: 24.5,
    },
    strategies: [
      {
        id: 1,
        name: 'Conservative Staking',
        apy: 28.5,
        tvl: 500000,
        followers: 142,
        profit: 125000,
        riskLevel: 'low' as const,
        protocols: ['Lido', 'Aave', 'Compound'],
        createdAt: 'Jan 2024',
      },
      {
        id: 2,
        name: 'Balanced Growth',
        apy: 22.8,
        tvl: 320000,
        followers: 98,
        profit: 72000,
        riskLevel: 'medium' as const,
        protocols: ['GMX', 'Pendle', 'Morpho'],
        createdAt: 'Feb 2024',
      },
      {
        id: 3,
        name: 'Yield Maximizer',
        apy: 18.2,
        tvl: 180000,
        followers: 47,
        profit: 32000,
        riskLevel: 'low' as const,
        protocols: ['Yearn', 'Convex', 'Beefy'],
        createdAt: 'Mar 2024',
      },
    ],
  };

  const getRiskBadge = (risk: 'low' | 'medium' | 'high') => {
    const config = {
      low: { icon: Shield, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
      medium: { icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
      high: { icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    };
    return config[risk];
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/10 to-emerald-500/10 border border-emerald-500/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-500/20">
                <Image
                  src={generateAvatar(avatarSeed, avatarStyle)}
                  alt={profileData.user.username}
                  width={96}
                  height={96}
                  className="w-full h-full"
                />
              </div>
              {profileData.user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#0a0a0a]">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              )}
              {/* Edit Avatar Button */}
              <button
                onClick={() => setShowAvatarSelector(true)}
                className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{profileData.user.username}</h1>
                {profileData.user.isVerified && (
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                    <span className="text-sm font-medium text-blue-400">Verified Creator</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-2 text-[#a1a1a1] hover:text-white transition-colors mb-3"
              >
                <span className="text-sm">{profileData.user.address}</span>
                {copiedAddress ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <p className="text-zinc-300 max-w-2xl mb-4">{profileData.user.bio}</p>
              <div className="flex items-center gap-2 text-sm text-[#a1a1a1]">
                <Calendar className="w-4 h-4" />
                <span>Joined {profileData.user.joinedDate}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-[#1a1a1a]/50">
                <p className="text-2xl font-bold text-white">{profileData.stats.totalFollowers}</p>
                <p className="text-sm text-[#a1a1a1]">Followers</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-[#1a1a1a]/50">
                <p className="text-2xl font-bold text-green-400">{profileData.stats.averageApy}%</p>
                <p className="text-sm text-[#a1a1a1]">Avg APY</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Revenue Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-sm text-[#a1a1a1]">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold text-white">${profileData.stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-[#6b7280] mt-1">From performance fees</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10">
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-sm text-[#a1a1a1]">Active Strategies</span>
            </div>
            <p className="text-2xl font-bold text-white">{profileData.stats.totalStrategies}</p>
            <p className="text-xs text-[#6b7280] mt-1">Live strategies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-sm text-[#a1a1a1]">Total Followers</span>
            </div>
            <p className="text-2xl font-bold text-white">{profileData.stats.totalFollowers}</p>
            <p className="text-xs text-[#6b7280] mt-1">Copying strategies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-yellow-500/10">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-sm text-[#a1a1a1]">Avg APY</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{profileData.stats.averageApy}%</p>
            <p className="text-xs text-[#6b7280] mt-1">Across all strategies</p>
          </motion.div>
        </div>

        {/* Strategies List */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Published Strategies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileData.strategies.map((strategy, index) => {
              const riskConfig = getRiskBadge(strategy.riskLevel);
              const RiskIcon = riskConfig.icon;

              return (
                <motion.div
                  key={strategy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-6 rounded-xl bg-[#1a1a1a] border border-[#262626] hover:border-emerald-500 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors mb-1">
                        {strategy.name}
                      </h3>
                      <p className="text-xs text-[#6b7280]">{strategy.createdAt}</p>
                    </div>
                    <div className={`p-2 rounded-xl ${riskConfig.bg} border ${riskConfig.border}`}>
                      <RiskIcon className={`w-4 h-4 ${riskConfig.color}`} />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#a1a1a1]">APY</span>
                      <span className="text-xl font-bold text-green-400">{strategy.apy}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#a1a1a1]">TVL</span>
                      <span className="text-sm font-medium text-white">${(strategy.tvl / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#a1a1a1]">Followers</span>
                      <span className="text-sm font-medium text-white">{strategy.followers}</span>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-wrap mb-4">
                    {strategy.protocols.map((protocol) => (
                      <span key={protocol} className="text-xs px-2 py-1 rounded bg-[#262626] text-[#a1a1a1]">
                        {protocol}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href="/"
                      className="flex-1 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-medium text-center transition-colors"
                    >
                      Copy Strategy
                    </Link>
                    <button className="px-3 py-2 rounded-xl bg-[#262626] hover:bg-[#1a1a1a] transition-colors">
                      <ExternalLink className="w-4 h-4 text-[#a1a1a1]" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Avatar Selector Modal */}
      <AvatarSelector
        isOpen={showAvatarSelector}
        onClose={() => setShowAvatarSelector(false)}
        currentAddress={params.address}
        onSave={handleSaveAvatar}
      />
    </DashboardLayout>
  );
}
