'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, AlertCircle } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number, withdrawFrom: 'all' | string) => void;
  totalBalance: number;
  positions: Array<{ protocol: string; amount: number; apy: number }>;
}

export function WithdrawModal({ isOpen, onClose, onWithdraw, totalBalance, positions }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [withdrawFrom, setWithdrawFrom] = useState<'all' | string>('all');

  const handleWithdraw = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= totalBalance) {
      onWithdraw(numAmount, withdrawFrom);
      setAmount('');
      onClose();
    }
  };

  const setPercentage = (percent: number) => {
    setAmount((totalBalance * percent).toFixed(2));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-zinc-800 bg-gradient-to-r from-red-500/10 to-orange-500/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <Upload className="w-6 h-6 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Withdraw Funds</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-lg">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[25, 50, 75, 100].map((percent) => (
                      <button
                        key={percent}
                        onClick={() => setPercentage(percent / 100)}
                        className="flex-1 px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                      >
                        {percent}%
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-500 mt-2">
                    Available: ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Withdraw From */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">Withdraw From</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-zinc-700 cursor-pointer hover:border-indigo-500 transition-colors">
                      <input
                        type="radio"
                        name="withdrawFrom"
                        value="all"
                        checked={withdrawFrom === 'all'}
                        onChange={(e) => setWithdrawFrom(e.target.value)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-white">Proportionally from all protocols</div>
                        <p className="text-xs text-zinc-400 mt-0.5">Recommended - Maintains allocation balance</p>
                      </div>
                    </label>

                    {positions.map((position) => (
                      <label
                        key={position.protocol}
                        className="flex items-center gap-3 p-4 rounded-xl border-2 border-zinc-700 cursor-pointer hover:border-indigo-500 transition-colors"
                      >
                        <input
                          type="radio"
                          name="withdrawFrom"
                          value={position.protocol}
                          checked={withdrawFrom === position.protocol}
                          onChange={(e) => setWithdrawFrom(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-white">{position.protocol}</span>
                            <span className="text-sm text-zinc-400">${position.amount.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">{position.apy}% APY</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Estimated Info */}
                <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">You will receive</span>
                    <span className="text-sm font-medium text-white">
                      ~${parseFloat(amount || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Est. Gas Fee</span>
                    <span className="text-sm font-medium text-white">~$2.50</span>
                  </div>
                </div>

                {/* Warning */}
                {parseFloat(amount) > totalBalance && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-400">Insufficient balance</p>
                      <p className="text-xs text-red-400/80 mt-1">
                        You can't withdraw more than your current balance
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > totalBalance}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Withdraw
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
