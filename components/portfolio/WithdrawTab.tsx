'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, CheckCircle2, Wallet } from 'lucide-react';

const mockPositions = [
  { protocol: 'Aave V3', amount: 5250, token: 'USDC' },
  { protocol: 'Lido', amount: 4860, token: 'ETH' },
  { protocol: 'Yearn Finance', amount: 3892, token: 'USDC' },
  { protocol: 'Compound', amount: 2180, token: 'USDC' },
];

export function WithdrawTab() {
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [amount, setAmount] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const currentPosition = mockPositions.find(p => p.protocol === selectedProtocol);
  const totalAvailable = mockPositions.reduce((sum, p) => sum + p.amount, 0);

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0 || !currentPosition) return;

    setIsWithdrawing(true);

    // Simulate withdrawal transaction
    await new Promise(resolve => setTimeout(resolve, 2500));

    setIsWithdrawing(false);
    setWithdrawSuccess(true);

    setTimeout(() => {
      setWithdrawSuccess(false);
      setAmount('');
      setSelectedProtocol('');
    }, 3000);
  };

  const setMaxAmount = () => {
    if (currentPosition) {
      setAmount(currentPosition.amount.toString());
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Withdraw Funds</h3>

        {/* Total Available */}
        <div className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Total Available to Withdraw</span>
            <span className="text-xl font-bold text-white">${totalAvailable.toLocaleString()}</span>
          </div>
        </div>

        {/* Position Selection */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-3">Select Position</label>
          <div className="space-y-2">
            {mockPositions.map((position) => (
              <button
                key={position.protocol}
                onClick={() => setSelectedProtocol(position.protocol)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedProtocol === position.protocol
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-zinc-800 bg-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{position.protocol}</p>
                    <p className="text-xs text-zinc-400 mt-1">{position.token}</p>
                  </div>
                  <p className="text-lg font-bold text-white">${position.amount.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        {selectedProtocol && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-zinc-400">Withdrawal Amount</label>
              <span className="text-xs text-zinc-500">
                Available: ${currentPosition?.amount.toLocaleString()}
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                max={currentPosition?.amount}
                className="w-full px-4 py-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-lg focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={setMaxAmount}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
              >
                MAX
              </button>
            </div>

            {amount && parseFloat(amount) > (currentPosition?.amount || 0) && (
              <p className="text-sm text-red-400 mt-2">Amount exceeds available balance</p>
            )}
          </motion.div>
        )}

        {/* Warning */}
        {amount && parseFloat(amount) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-6"
          >
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-400 font-medium mb-1">Withdrawal Notice</p>
                <p className="text-xs text-zinc-300">
                  Withdrawing funds will reduce your active positions and may affect your strategy allocation. Gas fees apply.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Withdrawal Summary */}
        {amount && parseFloat(amount) > 0 && parseFloat(amount) <= (currentPosition?.amount || 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 mb-6 space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Protocol</span>
              <span className="text-white font-medium">{currentPosition?.protocol}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Withdrawal Amount</span>
              <span className="text-white font-medium">${parseFloat(amount).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Network Fee</span>
              <span className="text-white">~$3.50</span>
            </div>
            <div className="border-t border-zinc-700 pt-2 flex items-center justify-between">
              <span className="text-zinc-400 font-medium">You Receive</span>
              <span className="text-white font-semibold text-lg">
                ${(parseFloat(amount) - 3.5).toLocaleString()}
              </span>
            </div>
          </motion.div>
        )}

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          disabled={
            !amount ||
            parseFloat(amount) <= 0 ||
            parseFloat(amount) > (currentPosition?.amount || 0) ||
            !selectedProtocol ||
            isWithdrawing ||
            withdrawSuccess
          }
          className="w-full p-4 rounded-xl bg-linear-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2 group"
        >
          {isWithdrawing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing Withdrawal...
            </>
          ) : withdrawSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Withdrawal Successful!
            </>
          ) : (
            <>
              Withdraw {amount && `$${parseFloat(amount).toLocaleString()}`}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Wallet className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-1">Withdrawal Process</h4>
            <p className="text-sm text-zinc-400">
              Funds are typically available in your wallet within 5-10 minutes after the transaction is confirmed on-chain.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
