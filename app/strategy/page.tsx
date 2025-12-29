'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  Zap,
  Loader2,
  AlertCircle,
  ArrowRight,
  Edit,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { RiskLevel, StrategyAnalysis, Protocol, CustomAllocation } from '@/types';
import { useRouter } from 'next/navigation';
import { ProtocolLibrary, StrategyCanvas, PortfolioSummary, AIQuestionnaireModal } from '@/features/strategy/components';
import { MessageCircle } from 'lucide-react';

const riskProfiles = [
  {
    id: 'conservative' as RiskLevel,
    name: 'Conservative',
    icon: Shield,
    color: 'green',
    description: 'Low risk, stable returns',
    targetApy: '5-8%',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'balanced' as RiskLevel,
    name: 'Balanced',
    icon: TrendingUp,
    color: 'blue',
    description: 'Moderate risk, balanced growth',
    targetApy: '8-15%',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 'aggressive' as RiskLevel,
    name: 'Aggressive',
    icon: Zap,
    color: 'red',
    description: 'High risk, maximum returns',
    targetApy: '15-30%+',
    gradient: 'from-orange-500 to-red-600',
  },
];

// Mock Protocol Data
const mockProtocols: Protocol[] = [
  { id: '1', name: 'Aave V3', apy: 5.2, tvl: '$8.2B', type: 'lending', risk: 'low', chain: 'Ethereum' },
  { id: '2', name: 'Lido Liquid Staking', apy: 6.8, tvl: '$32.1B', type: 'staking', risk: 'low', chain: 'Ethereum' },
  { id: '3', name: 'Yearn Finance', apy: 7.5, tvl: '$1.2B', type: 'yield', risk: 'low', chain: 'Ethereum' },
  { id: '4', name: 'Compound V3', apy: 8.5, tvl: '$5.4B', type: 'lending', risk: 'low', chain: 'Ethereum' },
  { id: '5', name: 'Convex Finance', apy: 12.2, tvl: '$3.8B', type: 'yield', risk: 'medium', chain: 'Ethereum' },
  { id: '6', name: 'Rocket Pool', apy: 14.5, tvl: '$2.1B', type: 'staking', risk: 'medium', chain: 'Ethereum' },
  { id: '7', name: 'Beefy Finance', apy: 16.8, tvl: '$890M', type: 'yield', risk: 'medium', chain: 'Multi-chain' },
  { id: '8', name: 'GMX V2', apy: 28.5, tvl: '$1.2B', type: 'yield', risk: 'high', chain: 'Arbitrum' },
  { id: '9', name: 'Pendle Finance', apy: 22.3, tvl: '$780M', type: 'yield', risk: 'high', chain: 'Ethereum' },
  { id: '10', name: 'Morpho Blue', apy: 18.5, tvl: '$450M', type: 'lending', risk: 'medium', chain: 'Ethereum' },
  { id: '11', name: 'Gains Network', apy: 25.2, tvl: '$320M', type: 'yield', risk: 'high', chain: 'Polygon' },
  { id: '12', name: 'Aura Finance', apy: 19.8, tvl: '$510M', type: 'yield', risk: 'medium', chain: 'Ethereum' },
];

export default function StrategyPage() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<StrategyAnalysis | null>(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Custom Strategy States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'lending' | 'staking' | 'yield'>('all');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [customAllocations, setCustomAllocations] = useState<CustomAllocation[]>([]);
  const [draggedProtocol, setDraggedProtocol] = useState<Protocol | null>(null);

  const handleAnalyze = async (riskLevel: RiskLevel) => {
    setSelectedRisk(riskLevel);
    setIsAnalyzing(true);
    setAnalysis(null);
    setIsCustomizing(false);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const timestamp = Date.now();

    // Mock AI analysis results
    const mockAnalysis: StrategyAnalysis = {
      riskLevel,
      expectedApy: riskLevel === 'conservative' ? 6.5 : riskLevel === 'balanced' ? 12.3 : 22.8,
      reasoning: `Based on current market conditions and ${riskLevel} risk tolerance, we've analyzed over 150 DeFi protocols across multiple chains. The recommended allocation optimizes for ${
        riskLevel === 'conservative'
          ? 'stability and capital preservation'
          : riskLevel === 'balanced'
          ? 'balanced growth with moderate volatility'
          : 'maximum yield with calculated risk exposure'
      }.`,
      timestamp,
      allocations:
        riskLevel === 'conservative'
          ? [
              {
                protocol: 'Aave V3',
                percentage: 40,
                apy: 5.2,
                tvl: '$8.2B',
                type: 'lending',
                risk: 'low',
              },
              {
                protocol: 'Lido Liquid Staking',
                percentage: 35,
                apy: 6.8,
                tvl: '$32.1B',
                type: 'staking',
                risk: 'low',
              },
              {
                protocol: 'Yearn Finance',
                percentage: 25,
                apy: 7.5,
                tvl: '$1.2B',
                type: 'yield',
                risk: 'low',
              },
            ]
          : riskLevel === 'balanced'
          ? [
              {
                protocol: 'Compound V3',
                percentage: 30,
                apy: 8.5,
                tvl: '$5.4B',
                type: 'lending',
                risk: 'low',
              },
              {
                protocol: 'Convex Finance',
                percentage: 30,
                apy: 12.2,
                tvl: '$3.8B',
                type: 'yield',
                risk: 'medium',
              },
              {
                protocol: 'Rocket Pool',
                percentage: 25,
                apy: 14.5,
                tvl: '$2.1B',
                type: 'staking',
                risk: 'medium',
              },
              {
                protocol: 'Beefy Finance',
                percentage: 15,
                apy: 16.8,
                tvl: '$890M',
                type: 'yield',
                risk: 'medium',
              },
            ]
          : [
              {
                protocol: 'GMX V2',
                percentage: 25,
                apy: 28.5,
                tvl: '$1.2B',
                type: 'yield',
                risk: 'high',
              },
              {
                protocol: 'Pendle Finance',
                percentage: 25,
                apy: 22.3,
                tvl: '$780M',
                type: 'yield',
                risk: 'high',
              },
              {
                protocol: 'Morpho Blue',
                percentage: 20,
                apy: 18.5,
                tvl: '$450M',
                type: 'lending',
                risk: 'medium',
              },
              {
                protocol: 'Gains Network',
                percentage: 20,
                apy: 25.2,
                tvl: '$320M',
                type: 'yield',
                risk: 'high',
              },
              {
                protocol: 'Aura Finance',
                percentage: 10,
                apy: 19.8,
                tvl: '$510M',
                type: 'yield',
                risk: 'medium',
              },
            ],
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);

    // Auto-populate custom allocations from AI recommendation
    const allocationsWithIds = mockAnalysis.allocations.map((alloc, idx) => {
      const protocol = mockProtocols.find((p) => p.name === alloc.protocol);
      return {
        id: protocol?.id || `${idx}`,
        name: alloc.protocol,
        apy: alloc.apy,
        tvl: alloc.tvl,
        type: alloc.type,
        risk: alloc.risk,
        chain: protocol?.chain || 'Ethereum',
        percentage: alloc.percentage,
        locked: false,
      } as CustomAllocation;
    });
    setCustomAllocations(allocationsWithIds);
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
    // Scroll to customization section
    setTimeout(() => {
      const element = document.getElementById('customization-panel');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleUseStrategy = () => {
    setIsCustomizing(false);
    router.push('/?tab=deposit'); // Navigate to dashboard with deposit tab
  };

  // Custom Strategy Functions
  const filteredProtocols = useMemo(() => {
    return mockProtocols.filter((protocol) => {
      const matchesSearch = protocol.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || protocol.type === filterType;
      const matchesRisk = filterRisk === 'all' || protocol.risk === filterRisk;
      const notInAllocations = !customAllocations.find((a) => a.id === protocol.id);
      return matchesSearch && matchesType && matchesRisk && notInAllocations;
    });
  }, [searchQuery, filterType, filterRisk, customAllocations]);

  const totalAllocation = useMemo(() => {
    return customAllocations.reduce((sum, allocation) => sum + allocation.percentage, 0);
  }, [customAllocations]);

  const expectedApy = useMemo(() => {
    if (customAllocations.length === 0) return 0;
    return customAllocations.reduce((sum, allocation) => {
      return sum + (allocation.apy * allocation.percentage) / 100;
    }, 0);
  }, [customAllocations]);

  const handleDragStart = (protocol: Protocol) => {
    setDraggedProtocol(protocol);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    if (draggedProtocol && customAllocations.length < 10) {
      const newAllocation: CustomAllocation = {
        ...draggedProtocol,
        percentage: 0,
        locked: false,
      };
      setCustomAllocations([...customAllocations, newAllocation]);
      setDraggedProtocol(null);
    }
  };

  const handleAddProtocol = (protocol: Protocol) => {
    if (customAllocations.length < 10) {
      const newAllocation: CustomAllocation = {
        ...protocol,
        percentage: 0,
        locked: false,
      };
      setCustomAllocations([...customAllocations, newAllocation]);
    }
  };

  const handleRemoveAllocation = (id: string) => {
    setCustomAllocations(customAllocations.filter((a) => a.id !== id));
  };

  const handlePercentageChange = (id: string, percentage: number) => {
    setCustomAllocations(
      customAllocations.map((a) => (a.id === id ? { ...a, percentage: Math.max(0, Math.min(100, percentage)) } : a))
    );
  };

  const handleToggleLock = (id: string) => {
    setCustomAllocations(customAllocations.map((a) => (a.id === id ? { ...a, locked: !a.locked } : a)));
  };

  const handleEqualWeight = () => {
    if (customAllocations.length === 0) return;
    const equalPercentage = Math.floor(100 / customAllocations.length);
    const remainder = 100 - equalPercentage * customAllocations.length;

    setCustomAllocations(
      customAllocations.map((a, index) => ({
        ...a,
        percentage: index === 0 ? equalPercentage + remainder : equalPercentage,
      }))
    );
  };

  const handleSaveStrategy = () => {
    if (totalAllocation === 100 && customAllocations.length > 0) {
      console.log('Strategy saved:', { customAllocations, expectedApy, totalAllocation });
      router.push('/?tab=deposit'); // Navigate to dashboard with deposit tab
    }
  };

  const handleQuestionnaireComplete = (riskLevel: RiskLevel) => {
    setIsQuestionnaireOpen(false);
    handleAnalyze(riskLevel);
  };

  if (!isConnected) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-[#a1a1a1]">Please connect your wallet to access strategy features</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Strategy Builder</h1>
          <p className="text-[#a1a1a1]">Get AI recommendations or build your own custom allocation</p>
        </div>

        {/* SECTION 1: Risk Profile Selection */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">What's your investment goal?</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <AIQuestionnaireModal
              isOpen={isQuestionnaireOpen}
              onClose={() => setIsQuestionnaireOpen(false)}
              onComplete={handleQuestionnaireComplete}
            />
            {riskProfiles.map((profile) => {
              const Icon = profile.icon;
              const isSelected = selectedRisk === profile.id;

              return (
                <motion.button
                  key={profile.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isAnalyzing && handleAnalyze(profile.id)}
                  disabled={isAnalyzing}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-[#262626] bg-[#1a1a1a] hover:border-[#2a2a2a]'
                  } ${isAnalyzing && !isSelected ? 'opacity-50' : ''}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${profile.gradient} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{profile.name}</h3>
                  <p className="text-sm text-[#a1a1a1] mb-3">{profile.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6b7280]">Target APY</span>
                    <span className="text-sm font-bold text-emerald-400">{profile.targetApy}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Ask AI Card */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setIsQuestionnaireOpen(true)}
            className="w-full p-6 rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 via-emerald-500/10 to-emerald-500/10 hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    Not sure? Ask AI for personalized strategy
                  </h3>
                  <p className="text-sm text-[#a1a1a1]">Answer 5 quick questions for a tailored recommendation</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>

        {/* SECTION 2: AI Analysis Loading */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 rounded-xl bg-[#1a1a1a] border border-[#262626] text-center"
            >
              <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Analyzing DeFi Protocols</h3>
              <p className="text-[#a1a1a1]">
                AI is analyzing TVL, APY, yield changes, and protocol metrics across multiple chains...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 3: AI Recommendation */}
        <AnimatePresence>
          {analysis && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary Card */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/10 border-2 border-emerald-500/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      ✨ Recommended: {analysis.riskLevel.charAt(0).toUpperCase() + analysis.riskLevel.slice(1)}{' '}
                      Strategy
                    </h3>
                    <p className="text-[#d4d4d4] text-sm leading-relaxed">{analysis.reasoning}</p>
                  </div>
                  <div className="text-right ml-6">
                    <p className="text-sm text-[#a1a1a1] mb-1">Expected APY</p>
                    <p className="text-4xl font-bold text-green-400">{analysis.expectedApy}%</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleUseStrategy}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    Use This Strategy
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCustomize}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#262626] hover:bg-[#2a2a2a] text-white font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-5 h-5" />
                    Customize Further
                    <ChevronDown className={`w-5 h-5 transition-transform ${isCustomizing ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Allocations Preview */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Recommended Allocations</h3>
                {analysis.allocations.map((allocation, index) => (
                  <motion.div
                    key={allocation.protocol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-[#1a1a1a] border border-[#262626]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{allocation.protocol}</h4>
                        <div className="flex items-center gap-3 text-sm text-[#a1a1a1] mt-1">
                          <span className="capitalize">{allocation.type}</span>
                          <span>•</span>
                          <span>TVL: {allocation.tvl}</span>
                          <span>•</span>
                          <span className={`capitalize ${
                            allocation.risk === 'low' ? 'text-green-400' :
                            allocation.risk === 'medium' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {allocation.risk} risk
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{allocation.percentage}%</p>
                        <p className="text-sm text-green-400">{allocation.apy}% APY</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-[#262626] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${allocation.percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 4: Customization Panel (Progressive Disclosure) */}
        <AnimatePresence>
          {isCustomizing && analysis && (
            <motion.div
              id="customization-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 rounded-xl bg-[#1a1a1a] border-2 border-emerald-500/30 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Customize Your Strategy</h3>
                    <p className="text-[#a1a1a1] mt-1">Adjust allocations, add or remove protocols</p>
                  </div>
                  <button
                    onClick={() => setIsCustomizing(false)}
                    className="p-2 rounded-xl hover:bg-[#262626] transition-colors"
                  >
                    <ChevronUp className="w-6 h-6 text-[#a1a1a1]" />
                  </button>
                </div>

                {/* Customization Interface */}
                <div className="grid lg:grid-cols-[320px_1fr_300px] gap-6">
                  {/* Left: Protocol Library */}
                  <ProtocolLibrary
                    protocols={filteredProtocols}
                    searchQuery={searchQuery}
                    filterType={filterType}
                    filterRisk={filterRisk}
                    onSearchChange={setSearchQuery}
                    onFilterTypeChange={setFilterType}
                    onFilterRiskChange={setFilterRisk}
                    onAddProtocol={handleAddProtocol}
                    onDragStart={handleDragStart}
                  />

                  {/* Center: Strategy Canvas */}
                  <StrategyCanvas
                    customAllocations={customAllocations}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onRemoveAllocation={handleRemoveAllocation}
                    onPercentageChange={handlePercentageChange}
                    onToggleLock={handleToggleLock}
                    onEqualWeight={handleEqualWeight}
                  />

                  {/* Right: Portfolio Summary */}
                  <PortfolioSummary
                    customAllocations={customAllocations}
                    totalAllocation={totalAllocation}
                    expectedApy={expectedApy}
                    onSave={handleSaveStrategy}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
