'use client';

import { motion } from 'framer-motion';
import { Trash2, Lock, Unlock } from 'lucide-react';
import { CustomAllocation } from '@/types';

interface AllocationCardProps {
  allocation: CustomAllocation;
  onRemove: (id: string) => void;
  onPercentageChange: (id: string, percentage: number) => void;
  onToggleLock: (id: string) => void;
}

export function AllocationCard({
  allocation,
  onRemove,
  onPercentageChange,
  onToggleLock,
}: AllocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-white">{allocation.name}</h4>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
            <span className="capitalize">{allocation.type}</span>
            <span>•</span>
            <span className="text-green-400">{allocation.apy}% APY</span>
            <span>•</span>
            <span>TVL: {allocation.tvl}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleLock(allocation.id)}
            className="p-1 hover:bg-zinc-700 rounded transition-colors"
          >
            {allocation.locked ? (
              <Lock className="w-4 h-4 text-yellow-400" />
            ) : (
              <Unlock className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          <button
            onClick={() => onRemove(allocation.id)}
            className="p-1 hover:bg-zinc-700 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {/* Percentage Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">Allocation</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={allocation.percentage}
              onChange={(e) => onPercentageChange(allocation.id, Number(e.target.value))}
              disabled={allocation.locked}
              className="w-16 px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white text-xs text-right focus:outline-none focus:border-indigo-500 disabled:opacity-50"
              min="0"
              max="100"
            />
            <span className="text-xs text-white">%</span>
          </div>
        </div>
        <input
          type="range"
          value={allocation.percentage}
          onChange={(e) => onPercentageChange(allocation.id, Number(e.target.value))}
          disabled={allocation.locked}
          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          min="0"
          max="100"
          step="1"
        />
      </div>
    </motion.div>
  );
}
