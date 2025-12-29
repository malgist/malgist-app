'use client';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Position {
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

interface ActivePositionsDonutProps {
  positions: Position[];
}

export default function ActivePositionsDonut({ positions }: ActivePositionsDonutProps) {
  // Calculate total value
  const totalValue = positions.reduce((sum, pos) => sum + pos.amount, 0);

  // Prepare data for the donut chart
  const chartData = {
    labels: positions.map((pos) => pos.protocol),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: positions.map((pos) => pos.amount),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',   // Indigo
          'rgba(16, 185, 129, 0.8)',   // Emerald
          'rgba(245, 158, 11, 0.8)',   // Amber
          'rgba(239, 68, 68, 0.8)',    // Red
          'rgba(139, 92, 246, 0.8)',   // Violet
          'rgba(236, 72, 153, 0.8)',   // Pink
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false, // We'll create custom legend
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (context: TooltipItem<'doughnut'>) {
            const value = context.parsed as number;
            const percentage = ((value / totalValue) * 100).toFixed(2);
            return `$${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '70%', // Makes it a donut (not a pie)
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Active Positions</h3>
        <span className="text-sm text-[#a1a1a1]">{positions.length} protocols</span>
      </div>

      {/* Donut Chart */}
      <div className="flex-1 flex items-center justify-center mb-4">
        <div className="relative w-full max-w-[200px] aspect-square">
          <Doughnut data={chartData} options={options} />
          {/* Center text showing total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-[#a1a1a1]">Total Value</p>
            <p className="text-xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Custom Legend */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        {positions.map((position, index) => {
          const percentage = ((position.amount / totalValue) * 100).toFixed(1);
          const colors = [
            'rgba(99, 102, 241, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
          ];

          return (
            <div
              key={position.protocol}
              className="flex items-center justify-between p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#262626] transition-colors"
            >
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm text-white truncate">{position.protocol}</span>
              </div>
              <div className="text-right ml-2">
                <p className="text-sm font-semibold text-white">
                  ${position.amount.toLocaleString()}
                </p>
                <p className="text-xs text-[#a1a1a1]">{percentage}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
