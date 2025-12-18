'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  Menu,
  X,
  Sparkles,
  Trophy,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAccount } from 'wagmi';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'strategy', label: 'Strategy', icon: TrendingUp, path: '/strategy' },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const pathname = usePathname();
  const { address, isConnected } = useAccount();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#1a1a1a] border border-[#262626] hover:bg-[#262626] transition-colors"
      >
        {collapsed ? <Menu className="w-6 h-6 text-white" /> : <X className="w-6 h-6 text-white" />}
      </button>

      {/* Sidebar - Glider.fi style */}
      <motion.aside
        initial={{ x: 0 }}
        animate={{ x: collapsed ? -280 : 0 }}
        className={clsx(
          'fixed lg:sticky top-0 left-0 h-screen bg-[#161616] border-r border-[#262626] z-40 flex flex-col transition-all duration-300',
          collapsed ? 'w-0 lg:w-20' : 'w-72'
        )}
      >
        {/* Logo - Glider.fi style - Larger */}
        <div className="p-3 border-b border-[#262626]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600">
              <Image
                src="/LogoMalgist.png"
                alt="Malgist Logo"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-base font-bold text-white tracking-tight">Malgist</h1>
                <p className="text-sm text-[#6b7280]">Automated Portfolios</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation - Glider.fi style - Larger */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link key={item.id} href={item.path}>
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    'flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group',
                    isActive
                      ? 'bg-[#1a1a1a] text-white'
                      : 'text-[#a1a1a1] hover:bg-[#1a1a1a] hover:text-white'
                  )}
                >
                  <Icon className={clsx(
                    'w-6 h-6 flex-shrink-0 transition-colors',
                    isActive ? 'text-emerald-500' : 'text-[#6b7280] group-hover:text-emerald-500'
                  )} />
                  {!collapsed && (
                    <span className="font-medium text-base">{item.label}</span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Profile Section - Glider.fi style */}
        <div className="p-4 border-t border-[#262626] space-y-3">
          {/* User Profile Card */}
          {isConnected && (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={clsx(
                  'w-full p-3 rounded-xl bg-[#1a1a1a] border border-[#262626] hover:bg-[#262626] transition-all group',
                  collapsed && 'p-2'
                )}
              >
                {!collapsed ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                      <p className="text-sm font-semibold text-white truncate">User</p>
                      <p className="text-xs text-[#6b7280] truncate">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
                      </p>
                    </div>
                    <Settings className="w-4 h-4 text-[#6b7280] group-hover:text-emerald-500 transition-colors" />
                  </div>
                ) : (
                  <User className="w-6 h-6 text-emerald-500 mx-auto" />
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && !collapsed && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-xl bg-[#1a1a1a] border border-[#262626] shadow-xl"
                >
                  <Link
                    href={`/profile/${address}`}
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#262626] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#a1a1a1]" />
                    <span className="text-sm text-white">View Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#262626] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#a1a1a1]" />
                    <span className="text-sm text-white">Settings</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-left">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">Disconnect</span>
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* AI Badge */}
          <div className={clsx(
            'px-3 py-3 rounded-xl bg-[#1a1a1a] border border-[#262626]',
            collapsed && 'px-2'
          )}>
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#a1a1a1]">AI-Powered</p>
                  <p className="text-sm font-semibold text-white">Smart Strategies</p>
                </div>
              </div>
            ) : (
              <Sparkles className="w-6 h-6 text-emerald-500 mx-auto" />
            )}
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
