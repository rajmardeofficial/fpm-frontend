// SectorPerformanceChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['Technology', 'Finance', 'Healthcare', 'Energy', 'Consumer'],
  datasets: [
    {
      label: 'Performance',
      data: [2400, 2210, 2290, 2000, 2181],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      borderRadius: 10, // Add border radius
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          size: 14, // Change legend font size
        },
      },
    },
    tooltip: {
      enabled: true,
      bodyFont: {
        size: 12, // Change tooltip font size
      },
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 17, // Change x-axis font size
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 17, // Change y-axis font size
        },
      },
    },
  },
};

function SectorPerformanceChart() {
  return <Bar data={data} options={options} className='topsectorchart'/>;
}

export default SectorPerformanceChart;
