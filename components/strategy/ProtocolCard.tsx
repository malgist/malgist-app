'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Protocol } from '@/types';

interface ProtocolCardProps {
  protocol: Protocol;
  onAdd: (protocol: Protocol) => void;
  onDragStart: (protocol: Protocol) => void;
}

export function ProtocolCard({ protocol, onAdd, onDragStart }: ProtocolCardProps) {
  return (
    <motion.div
      draggable
      onDragStart={() => onDragStart(protocol)}
      whileHover={{ scale: 1.00 }}
      className="p-3 bg-zinc-800 border border-zinc-700 rounded-lg cursor-grab active:cursor-grabbing hover:border-indigo-500 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{protocol.name}</h4>
          <p className="text-xs text-zinc-400 capitalize">{protocol.type}</p>
        </div>
        <button
          onClick={() => onAdd(protocol)}
          className="p-1 hover:bg-zinc-700 rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-indigo-400" />
        </button>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-green-400">{protocol.apy}% APY</span>
        <span className="text-zinc-500">TVL: {protocol.tvl}</span>
      </div>
      <div className="mt-2">
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            protocol.risk === 'low'
              ? 'bg-green-500/10 text-green-400'
              : protocol.risk === 'medium'
              ? 'bg-yellow-500/10 text-yellow-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {protocol.risk} risk
        </span>
      </div>
    </motion.div>
  );
}
