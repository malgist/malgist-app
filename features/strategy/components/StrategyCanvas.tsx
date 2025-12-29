'use client';

import { BarChart3 } from 'lucide-react';
import { CustomAllocation } from '@/types';
import { AllocationCard } from './AllocationCard';

interface StrategyCanvasProps {
  customAllocations: CustomAllocation[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onRemoveAllocation: (id: string) => void;
  onPercentageChange: (id: string, percentage: number) => void;
  onToggleLock: (id: string) => void;
  onEqualWeight: () => void;
}

export function StrategyCanvas({
  customAllocations,
  onDragOver,
  onDrop,
  onRemoveAllocation,
  onPercentageChange,
  onToggleLock,
  onEqualWeight,
}: StrategyCanvasProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Your Strategy</h3>
        <button
          onClick={onEqualWeight}
          disabled={customAllocations.length === 0}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
        >
          Equal Weight
        </button>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`min-h-[400px] p-6 rounded-xl border-2 border-dashed transition-colors ${
          customAllocations.length === 0
            ? 'border-zinc-700 bg-zinc-900/50'
            : 'border-zinc-800 bg-zinc-900'
        }`}
      >
        {customAllocations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <BarChart3 className="w-16 h-16 text-zinc-700 mb-4" />
            <h4 className="text-lg font-semibold text-white mb-2">Build Your Strategy</h4>
            <p className="text-sm text-zinc-400 max-w-md">
              Drag protocols from the library or click the + button to add them to your strategy
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {customAllocations.map((allocation) => (
              <AllocationCard
                key={allocation.id}
                allocation={allocation}
                onRemove={onRemoveAllocation}
                onPercentageChange={onPercentageChange}
                onToggleLock={onToggleLock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
