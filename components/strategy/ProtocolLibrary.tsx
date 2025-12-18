'use client';

import { Search } from 'lucide-react';
import { Protocol } from '@/types';
import { ProtocolCard } from './ProtocolCard';

interface ProtocolLibraryProps {
  protocols: Protocol[];
  searchQuery: string;
  filterType: 'all' | 'lending' | 'staking' | 'yield';
  filterRisk: 'all' | 'low' | 'medium' | 'high';
  onSearchChange: (query: string) => void;
  onFilterTypeChange: (type: 'all' | 'lending' | 'staking' | 'yield') => void;
  onFilterRiskChange: (risk: 'all' | 'low' | 'medium' | 'high') => void;
  onAddProtocol: (protocol: Protocol) => void;
  onDragStart: (protocol: Protocol) => void;
}

export function ProtocolLibrary({
  protocols,
  searchQuery,
  filterType,
  filterRisk,
  onSearchChange,
  onFilterTypeChange,
  onFilterRiskChange,
  onAddProtocol,
  onDragStart,
}: ProtocolLibraryProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-4">Protocol Library</h3>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search protocols..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="space-y-2 mb-4">
          <select
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value as 'all' | 'lending' | 'staking' | 'yield')}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="lending">Lending</option>
            <option value="staking">Staking</option>
            <option value="yield">Yield</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => onFilterRiskChange(e.target.value as 'all' | 'low' | 'medium' | 'high')}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>

        {/* Protocol List */}
        {/*
          Choose your scrollbar style by uncommenting one of the options below:

          Option 1 (Default): custom-scrollbar - Styled scrollbar with indigo color
          Option 2: hide-scrollbar - Hidden scrollbar, still scrollable
          Option 3: fade-scrollbar - Appears only on hover
          Option 4: custom-scrollbar scroll-fade-both - Styled scrollbar + gradient fade
        */}
        <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
          {protocols.map((protocol) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onAdd={onAddProtocol}
              onDragStart={onDragStart}
            />
          ))}
          {protocols.length === 0 && (
            <div className="text-center text-zinc-500 text-sm py-8">No protocols found</div>
          )}
        </div>
      </div>
    </div>
  );
}
