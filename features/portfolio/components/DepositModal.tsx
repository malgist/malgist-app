'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, AlertCircle } from 'lucide-react';
import { TokenType } from '@/types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, token: TokenType, protocol?: string) => void;
}

const tokens: { value: TokenType; label: string; balance: number }[] = [
  { value: 'USDC', label: 'USDC', balance: 50000 },
  { value: 'ETH', label: 'ETH', balance: 10.5 },
  { value: 'MNT', label: 'MNT', balance: 25000 },
];

const protocols = [
  { value: 'aave', label: 'Aave V3', apy: 5.2 },
  { value: 'lido', label: 'Lido', apy: 4.8 },
  { value: 'gmx', label: 'GMX', apy: 28.5 },
  { value: 'compound', label: 'Compound', apy: 4.5 },
];

export function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<TokenType>('USDC');
  const [allocationType, setAllocationType] = useState<'auto' | 'manual'>('auto');
  const [selectedProtocol, setSelectedProtocol] = useState('aave');

  const selectedTokenData = tokens.find((t) => t.value === selectedToken);
  const selectedProtocolData = protocols.find((p) => p.value === selectedProtocol);

  const handleDeposit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= (selectedTokenData?.balance || 0)) {
      onDeposit(numAmount, selectedToken, allocationType === 'manual' ? selectedProtocol : undefined);
      setAmount('');
      onClose();
    }
  };

  const setPercentage = (percent: number) => {
    if (selectedTokenData) {
      setAmount((selectedTokenData.balance * percent).toFixed(2));
    }
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
              <div className="relative p-6 border-b border-zinc-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20">
                    <Download className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Deposit Funds</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Token Selection */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Token</label>
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value as TokenType)}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    {tokens.map((token) => (
                      <option key={token.value} value={token.value}>
                        {token.label} (Balance: {token.balance.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-lg focus:outline-none focus:border-indigo-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">
                      {selectedToken}
                    </span>
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
                    Available: {selectedTokenData?.balance.toLocaleString()} {selectedToken}
                  </p>
                </div>

                {/* Allocation Type */}
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">Allocation</label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-zinc-700 cursor-pointer hover:border-indigo-500 transition-colors">
                      <input
                        type="radio"
                        name="allocation"
                        value="auto"
                        checked={allocationType === 'auto'}
                        onChange={(e) => setAllocationType(e.target.value as 'auto')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-white mb-1">Auto-allocate (Recommended)</div>
                        <p className="text-sm text-zinc-400">
                          Distribute funds based on your current strategy allocation
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-zinc-700 cursor-pointer hover:border-indigo-500 transition-colors">
                      <input
                        type="radio"
                        name="allocation"
                        value="manual"
                        checked={allocationType === 'manual'}
                        onChange={(e) => setAllocationType(e.target.value as 'manual')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-white mb-1">Choose protocol manually</div>
                        <p className="text-sm text-zinc-400">Deposit to a specific protocol</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Protocol Selection (if manual) */}
                {allocationType === 'manual' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Select Protocol</label>
                    <select
                      value={selectedProtocol}
                      onChange={(e) => setSelectedProtocol(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    >
                      {protocols.map((protocol) => (
                        <option key={protocol.value} value={protocol.value}>
                          {protocol.label} - {protocol.apy}% APY
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}

                {/* Estimated Info */}
                <div className="p-4 rounded-xl bg-zinc-800 border border-zinc-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-zinc-400">Estimated APY</span>
                    <span className="text-sm font-medium text-green-400">
                      {allocationType === 'auto' ? '~8.5%' : `${selectedProtocolData?.apy}%`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-400">Est. Gas Fee</span>
                    <span className="text-sm font-medium text-white">~$2.50</span>
                  </div>
                </div>

                {/* Warning */}
                {parseFloat(amount) > (selectedTokenData?.balance || 0) && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-400">Insufficient balance</p>
                      <p className="text-xs text-red-400/80 mt-1">
                        You don&apos;t have enough {selectedToken} to deposit this amount
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
                    onClick={handleDeposit}
                    disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > (selectedTokenData?.balance || 0)}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Deposit
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
