'use client';

import { motion } from 'framer-motion';
import { Download, Upload, RefreshCw, CheckCircle2, ExternalLink, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { Transaction } from '@/types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 5000,
    token: 'USDC',
    timestamp: Date.now() - 86400000 * 1,
    txHash: '0x1234...5678',
    status: 'success',
  },
  {
    id: '2',
    type: 'rebalance',
    amount: 0,
    token: 'USDC',
    timestamp: Date.now() - 86400000 * 3,
    txHash: '0x2345...6789',
    status: 'success',
  },
  {
    id: '3',
    type: 'deposit',
    amount: 3500,
    token: 'ETH',
    timestamp: Date.now() - 86400000 * 5,
    txHash: '0x3456...7890',
    status: 'success',
  },
  {
    id: '4',
    type: 'claim',
    amount: 150,
    token: 'USDC',
    timestamp: Date.now() - 86400000 * 7,
    txHash: '0x4567...8901',
    status: 'success',
  },
  {
    id: '5',
    type: 'deposit',
    amount: 2000,
    token: 'MNT',
    timestamp: Date.now() - 86400000 * 10,
    txHash: '0x5678...9012',
    status: 'success',
  },
  {
    id: '6',
    type: 'rebalance',
    amount: 0,
    token: 'USDC',
    timestamp: Date.now() - 86400000 * 14,
    txHash: '0x6789...0123',
    status: 'success',
  },
];

const typeConfig = {
  deposit: { icon: Download, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Deposit' },
  withdraw: { icon: Upload, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Withdraw' },
  rebalance: { icon: RefreshCw, color: 'text-indigo-400', bg: 'bg-indigo-500/10', label: 'Rebalance' },
  claim: { icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'Claim Rewards' },
};

export function HistoryTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Transaction History</h3>
          <p className="text-sm text-zinc-400 mt-1">{mockTransactions.length} total transactions</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {mockTransactions.map((tx, index) => {
          const config = typeConfig[tx.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-base font-semibold text-white">{config.label}</h4>
                      <p className="text-sm text-zinc-400 mt-0.5">
                        {format(new Date(tx.timestamp), 'MMM dd, yyyy • HH:mm')}
                      </p>
                    </div>

                    {tx.amount > 0 && (
                      <div className="text-right">
                        <p className={`text-lg font-bold ${tx.type === 'withdraw' ? 'text-red-400' : 'text-white'}`}>
                          {tx.type === 'withdraw' ? '-' : '+'}${tx.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-zinc-400">{tx.token}</p>
                      </div>
                    )}
                  </div>

                  {/* Transaction Hash */}
                  <div className="flex items-center gap-2 mt-3">
                    <code className="text-xs text-zinc-500 font-mono">{tx.txHash}</code>
                    <ExternalLink className="w-3 h-3 text-zinc-500 cursor-pointer hover:text-white transition-colors" />
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/10 text-xs text-green-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More */}
      <button className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition-colors text-sm text-white">
        Load More Transactions
      </button>
    </div>
  );
}
