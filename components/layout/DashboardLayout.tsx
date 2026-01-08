'use client';

import { Sidebar } from './Sidebar';
import { ConnectButton } from '../wallet/ConnectButton';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { Search } from 'lucide-react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header - Glider.fi style with search */}
        <header className="sticky top-0 z-20 border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-6 px-8 py-4">
            {/* Search Bar - Glider.fi style */}
            <div className="flex-1 max-w-md relative">
            
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
