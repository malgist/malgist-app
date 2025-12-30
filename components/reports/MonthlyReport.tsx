'use client';

import { Card } from '@/components/ui/Card';
import { Calendar, TrendingUp, DollarSign, Award } from 'lucide-react';

export function MonthlyReport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Monthly Reports</h1>
          <p className="text-[#a1a1a1] mt-2">
            Comprehensive analysis of your portfolio performance
          </p>
        </div>
        <div className="flex items-center gap-2 text-[#a1a1a1]">
          <Calendar className="w-5 h-5" />
          <span>December 2025</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-[#a1a1a1]">Total Earnings</p>
              <p className="text-2xl font-bold text-white">$0.00</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-[#a1a1a1]">Average APY</p>
              <p className="text-2xl font-bold text-white">0.00%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Award className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-[#a1a1a1]">Best Protocol</p>
              <p className="text-2xl font-bold text-white">N/A</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Coming Soon Notice */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-12 text-center">
        <div className="max-w-md mx-auto">
          <Calendar className="w-16 h-16 text-[#a1a1a1] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Monthly Reports Coming Soon
          </h3>
          <p className="text-[#a1a1a1]">
            We&apos;re working on comprehensive monthly reports that will include detailed
            analytics, performance metrics, and downloadable PDF reports.
          </p>
        </div>
      </Card>
    </div>
  );
}
