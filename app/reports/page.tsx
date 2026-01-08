'use client';

import { useAccount } from 'wagmi';
import { AlertCircle } from 'lucide-react';
import { MonthlyReport } from '@/components/reports/MonthlyReport';

export default function ReportsPage() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
          <p className="text-[#a1a1a1]">Please connect your wallet to view your reports</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <MonthlyReport />
    </div>
  );
}
