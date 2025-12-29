'use client';

import { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CustomAllocation, TokenType } from '@/types';
import { DepositModal } from '@/features/portfolio/components';

interface PortfolioSummaryProps {
  customAllocations: CustomAllocation[];
  totalAllocation: number;
  expectedApy: number;
  onSave: () => void;
}

export function PortfolioSummary({
  customAllocations,
  totalAllocation,
  expectedApy,
  onSave,
}: PortfolioSummaryProps) {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const highRiskPercentage = customAllocations
    .filter((a) => a.risk === 'high')
    .reduce((sum, a) => sum + a.percentage, 0);

  const hasOverconcentration = customAllocations.some((a) => a.percentage > 50);
  const isValid = totalAllocation === 100 && customAllocations.length > 0;

  const handleSaveAndImplement = () => {
    onSave(); // Call the original onSave callback
    setIsDepositModalOpen(true); // Open deposit modal
  };

  const handleDeposit = (amount: number, token: TokenType, protocol?: string) => {
    console.log('Deposit to strategy:', { amount, token, protocol, allocations: customAllocations });
    // Here you can implement the actual deposit logic
    setIsDepositModalOpen(false);
  };

  return (
    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 sticky top-4">
      <h3 className="text-lg font-semibold text-white mb-4">Portfolio Summary</h3>

      {/* Total Allocation */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-zinc-400">Total Allocation</span>
          <span
            className={`text-2xl font-bold ${
              totalAllocation === 100
                ? 'text-green-400'
                : totalAllocation > 100
                ? 'text-red-400'
                : 'text-yellow-400'
            }`}
          >
            {totalAllocation}%
          </span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              totalAllocation === 100
                ? 'bg-green-500'
                : totalAllocation > 100
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
            style={{ width: `${Math.min(totalAllocation, 100)}%` }}
          />
        </div>
        {totalAllocation !== 100 && customAllocations.length > 0 && (
          <p className="text-xs text-zinc-500 mt-2">
            {totalAllocation < 100
              ? `${100 - totalAllocation}% remaining`
              : `Over allocated by ${totalAllocation - 100}%`}
          </p>
        )}
      </div>

      {/* Expected APY */}
      <div className="mb-6 p-3 bg-zinc-800 rounded-lg">
        <div className="text-xs text-zinc-400 mb-1">Expected APY</div>
        <div className="text-3xl font-bold text-green-400">{expectedApy.toFixed(2)}%</div>
      </div>

      {/* Risk Distribution */}
      {customAllocations.length > 0 && (
        <div className="mb-6">
          <div className="text-xs text-zinc-400 mb-2">Risk Distribution</div>
          <div className="space-y-1">
            {['low', 'medium', 'high'].map((risk) => {
              const percentage = customAllocations
                .filter((a) => a.risk === risk)
                .reduce((sum, a) => sum + a.percentage, 0);
              if (percentage === 0) return null;
              return (
                <div key={risk} className="flex items-center justify-between text-xs">
                  <span className="capitalize text-zinc-400">{risk}</span>
                  <span
                    className={
                      risk === 'low'
                        ? 'text-green-400'
                        : risk === 'medium'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }
                  >
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Protocol Count */}
      <div className="mb-6 text-xs text-zinc-400">
        <div className="flex items-center justify-between">
          <span>Protocols</span>
          <span className="text-white">{customAllocations.length} / 10</span>
        </div>
      </div>

      {/* Validation Messages */}
      {customAllocations.length > 0 && (
        <div className="space-y-2 mb-6">
          {totalAllocation !== 100 && (
            <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Total allocation must equal 100%</span>
            </div>
          )}
          {hasOverconcentration && (
            <div className="flex items-start gap-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Single protocol exceeds 50%</span>
            </div>
          )}
          {highRiskPercentage > 30 && (
            <div className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>High risk allocation exceeds 30%</span>
            </div>
          )}
          {isValid && (
            <div className="flex items-start gap-2 p-2 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Strategy is ready to save</span>
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSaveAndImplement}
        disabled={!isValid}
        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
      >
        Save & Implement Strategy
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDeposit={handleDeposit}
      />
    </div>
  );
}
