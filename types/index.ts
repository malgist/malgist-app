export type RiskLevel = 'conservative' | 'balanced' | 'aggressive';

export interface AllocationRecommendation {
  protocol: string;
  percentage: number;
  apy: number;
  tvl: string;
  type: 'lending' | 'staking' | 'yield';
  risk: 'low' | 'medium' | 'high';
}

export interface StrategyAnalysis {
  riskLevel: RiskLevel;
  allocations: AllocationRecommendation[];
  expectedApy: number;
  reasoning: string;
  timestamp: number;
}

export interface PortfolioPosition {
  id: string;
  protocol: string;
  type: string;
  amount: number;
  value: number;
  apy: number;
  earnings: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'rebalance' | 'claim';
  amount: number;
  token: string;
  timestamp: number;
  txHash: string;
  status: 'pending' | 'success' | 'failed';
}

export interface ProfitData {
  date: string;
  value: number;
  apy: number;
}

export type TokenType = 'USDC' | 'ETH' | 'MNT';

export interface Protocol {
  id: string;
  name: string;
  logo?: string;
  apy: number;
  tvl: string;
  type: 'lending' | 'staking' | 'yield';
  risk: 'low' | 'medium' | 'high';
  chain: string;
  description?: string;
}

export interface CustomAllocation extends Protocol {
  percentage: number;
  locked?: boolean;
}

export interface CustomStrategy {
  id?: string;
  name: string;
  allocations: CustomAllocation[];
  expectedApy: number;
  totalAllocation: number;
  createdAt?: number;
}
