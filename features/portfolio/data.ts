// Mock Data for Portfolio Feature
import { Position } from './types';

export const mockPositions: Position[] = [
  {
    protocol: 'Aave V3',
    amount: 50000,
    percentage: 40,
    apy: 5.2,
    profit: 2500,
    profitPercentage: 5.0,
    risk: 'low',
    chain: 'Ethereum',
    tvl: '$8.2B',
    since: 'Jan 15, 2024',
  },
  {
    protocol: 'Lido',
    amount: 43750,
    percentage: 35,
    apy: 4.8,
    profit: 2100,
    profitPercentage: 4.8,
    risk: 'low',
    chain: 'Ethereum',
    tvl: '$14.5B',
    since: 'Jan 15, 2024',
  },
  {
    protocol: 'GMX',
    amount: 31250,
    percentage: 25,
    apy: 28.5,
    profit: 7125,
    profitPercentage: 22.8,
    risk: 'high',
    chain: 'Arbitrum',
    tvl: '$1.2B',
    since: 'Jan 15, 2024',
  },
];

export const mockRecentActivity = [
  { type: 'deposit', protocol: 'Aave V3', amount: 10000, time: '2 hours ago', txHash: '0x123...' },
  { type: 'claim', protocol: 'Lido', amount: 125, time: '1 day ago', txHash: '0x456...' },
  { type: 'rebalance', protocol: 'Portfolio', amount: 0, time: '3 days ago', txHash: '0x789...' },
  { type: 'withdraw', protocol: 'GMX', amount: 5000, time: '5 days ago', txHash: '0xabc...' },
  { type: 'deposit', protocol: 'Compound', amount: 15000, time: '7 days ago', txHash: '0xdef...' },
];

// Mock chart data for different timeframes
export const mockChartData = {
  '1D': Array.from({ length: 24 }, (_, i) => ({
    date: `${i}:00`,
    value: 125000 + Math.random() * 2000 - 1000,
  })),
  '1W': Array.from({ length: 7 }, (_, i) => ({
    date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: 125000 + Math.random() * 5000 - 2500,
  })),
  '1M': Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    value: 125000 + Math.random() * 8000 - 4000,
  })),
  '3M': Array.from({ length: 90 }, (_, i) => ({
    date: `Day ${i + 1}`,
    value: 125000 + Math.random() * 15000 - 7500,
  })),
  '1Y': Array.from({ length: 12 }, (_, i) => ({
    date: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: 125000 + Math.random() * 25000 - 12500,
  })),
  'ALL': Array.from({ length: 24 }, (_, i) => ({
    date: `Month ${i + 1}`,
    value: 125000 + Math.random() * 40000 - 20000,
  })),
};
