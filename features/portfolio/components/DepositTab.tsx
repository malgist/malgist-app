'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Info, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TokenType } from '@/types';

const tokens = [
  {
    symbol: 'USDC' as TokenType,
    name: 'USD Coin',
    icon: '💵',
    balance: 10000,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    symbol: 'ETH' as TokenType,
    name: 'Ethereum',
    icon: '⟠',
    balance: 5.5,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    symbol: 'MNT' as TokenType,
    name: 'Mantle',
    icon: '🔷',
    balance: 2500,
    color: 'from-green-500 to-emerald-600',
  },
];

export function DepositTab() {
  const [selectedToken, setSelectedToken] = useState<TokenType>('USDC');
  const [amount, setAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [depositSuccess, setDepositSuccess] = useState(false);

  const currentToken = tokens.find(t => t.symbol === selectedToken);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;

    setIsDepositing(true);

    // Simulate deposit transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsDepositing(false);
    setDepositSuccess(true);

    setTimeout(() => {
      setDepositSuccess(false);
      setAmount('');
    }, 3000);
  };

  const setMaxAmount = () => {
    if (currentToken) {
      setAmount(currentToken.balance.toString());
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Deposit Funds</h3>

        {/* Token Selection */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-3">Select Token</label>
          <div className="grid grid-cols-3 gap-3">
            {tokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => setSelectedToken(token.symbol)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedToken === token.symbol
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-zinc-800 bg-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <div className="text-3xl mb-2">{token.icon}</div>
                <div className="text-sm font-semibold text-white">{token.symbol}</div>
                <div className="text-xs text-zinc-400 mt-1">{token.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm text-zinc-400">Amount</label>
            <span className="text-xs text-zinc-500">
              Balance: {currentToken?.balance} {currentToken?.symbol}
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-4 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-lg focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={setMaxAmount}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
            >
              MAX
            </button>
          </div>

          {amount && parseFloat(amount) > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-zinc-400 mt-2"
            >
              ≈ ${(parseFloat(amount) * (currentToken?.symbol === 'ETH' ? 2500 : 1)).toLocaleString()} USD
            </motion.p>
          )}
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-400 font-medium mb-1">Deposit Information</p>
              <p className="text-xs text-zinc-300">
                Your funds will be allocated based on your selected strategy. You can withdraw or rebalance anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Deposit Summary */}
        {amount && parseFloat(amount) > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-zinc-800 border border-zinc-700 mb-6 space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Deposit Amount</span>
              <span className="text-white font-medium">
                {amount} {currentToken?.symbol}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Network Fee</span>
              <span className="text-white">~$2.50</span>
            </div>
            <div className="border-t border-zinc-700 pt-2 flex items-center justify-between">
              <span className="text-zinc-400 font-medium">Total</span>
              <span className="text-white font-semibold text-lg">
                {amount} {currentToken?.symbol}
              </span>
            </div>
          </motion.div>
        )}

        {/* Deposit Button */}
        <button
          onClick={handleDeposit}
          disabled={!amount || parseFloat(amount) <= 0 || isDepositing || depositSuccess}
          className="w-full p-4 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2 group"
        >
          {isDepositing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing Deposit...
            </>
          ) : depositSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Deposit Successful!
            </>
          ) : (
            <>
              Deposit {amount && `${amount} ${currentToken?.symbol}`}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </motion.div>

      {/* Strategy Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-zinc-900 border border-zinc-800"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-1">No Active Strategy</h4>
            <p className="text-sm text-zinc-400 mb-3">
              Create a strategy first to automatically allocate your deposit across DeFi protocols.
            </p>
            <a
              href="/strategy"
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Create Strategy
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
