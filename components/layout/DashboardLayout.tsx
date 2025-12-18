'use client';

import { Sidebar } from './Sidebar';
import { ConnectButton } from '../wallet/ConnectButton';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

const getPageTitle = (pathname: string) => {
  if (pathname === '/') return 'Dashboard';
  if (pathname === '/strategy') return 'Strategy';
  if (pathname === '/leaderboard') return 'Leaderboard';
  if (pathname === '/reports') return 'Reports';
  if (pathname.startsWith('/profile/')) return 'Profile';
  return 'Dashboard';
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header - Glider.fi style with search */}
        <header className="sticky top-0 z-20 border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-6 px-8 py-4">
            {/* Search Bar - Glider.fi style */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search portfolios, strategies, tokens..."
                className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-xl text-white text-sm placeholder-[#6b7280] focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-[#6b7280] bg-[#262626] rounded border border-[#2a2a2a]">
                /
              </kbd>
            </div>

            <div className="flex items-center gap-3">
              <NotificationCenter />
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Main Content - Glider.fi style */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
