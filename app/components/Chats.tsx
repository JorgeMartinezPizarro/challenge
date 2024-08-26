import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type MyChartProps = {
  data: string[][];
};

const generateChartData = (data: string[][]): ChartData<'doughnut'> => {
  const counts: Record<string, number> = data.flat().reduce((acc: Record<string, number>, value: string) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});

  const sortedEntries = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20);

  return {
    labels: sortedEntries.map(([key]) => key),
    datasets: [
      {
        label: 'Occurrences',
        data: sortedEntries.map(([, value]) => value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const MyChart: React.FC<MyChartProps> = ({ data }) => {
  return (
    <Doughnut 
      data={generateChartData(data)} 
      options={{
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      }}
    />
  );
};

export default MyChart;
