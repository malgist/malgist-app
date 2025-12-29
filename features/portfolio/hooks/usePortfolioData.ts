import { useMemo } from 'react';
import { mockPositions, mockRecentActivity, mockChartData } from '../data';
import { TimeFrame } from '../types';

export function usePortfolioData() {
  const positions = mockPositions;
  const recentActivity = mockRecentActivity;

  const stats = useMemo(() => {
    const totalBalance = positions.reduce((sum, pos) => sum + pos.amount, 0);
    const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);
    const totalProfitPercentage = (totalProfit / totalBalance) * 100;
    const avgApy = positions.reduce((sum, pos) => sum + pos.apy * pos.percentage, 0) / 100;

    return {
      totalBalance,
      totalProfit,
      totalProfitPercentage,
      avgApy,
      dayChange: 2340,
      dayChangePercentage: 1.87,
    };
  }, [positions]);

  const getChartData = (timeframe: TimeFrame) => {
    return mockChartData[timeframe];
  };

  const rebalanceData = useMemo(() => {
    return positions.map((pos) => ({
      protocol: pos.protocol,
      current: pos.percentage,
      target: pos.percentage,
      apy: pos.apy,
    }));
  }, [positions]);

  return {
    positions,
    recentActivity,
    stats,
    getChartData,
    rebalanceData,
  };
}
