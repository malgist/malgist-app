// Portfolio Feature Types

export interface Position {
  protocol: string;
  amount: number;
  percentage: number;
  apy: number;
  profit: number;
  profitPercentage: number;
  risk: 'low' | 'medium' | 'high';
  chain: string;
  tvl: string;
  since: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

export interface PortfolioStats {
  totalValue: number;
  totalProfit: number;
  profitPercentage: number;
  positions: Position[];
  chartData: ChartDataPoint[];
}
