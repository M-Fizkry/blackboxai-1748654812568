import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  // Common options for all charts
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Raw Materials Data
  const rawMaterialsData = {
    labels: ['Steel', 'Aluminum', 'Copper', 'Plastic', 'Silicon', 'Glass'],
    datasets: [
      {
        type: 'bar',
        label: 'Current Stock',
        data: [150, 230, 180, 420, 280, 340],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
        order: 2,
      },
      {
        type: 'line',
        label: 'Minimum Stock',
        data: [100, 150, 120, 300, 200, 250],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        order: 1,
      },
      {
        type: 'line',
        label: 'Maximum Stock',
        data: [300, 400, 350, 600, 450, 500],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        order: 0,
      },
    ],
  };

  // Work in Progress (WIP) Data
  const wipData = {
    labels: ['Engine Parts', 'Circuit Boards', 'Chassis', 'Display Units', 'Power Supply', 'Controllers'],
    datasets: [
      {
        type: 'bar',
        label: 'Current WIP',
        data: [85, 120, 95, 160, 140, 110],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
        order: 2,
      },
      {
        type: 'line',
        label: 'Minimum WIP',
        data: [50, 80, 60, 100, 90, 70],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        order: 1,
      },
      {
        type: 'line',
        label: 'Maximum WIP',
        data: [150, 200, 180, 250, 220, 190],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        order: 0,
      },
    ],
  };

  // Finished Goods Data
  const finishedGoodsData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
    datasets: [
      {
        type: 'bar',
        label: 'Current Stock',
        data: [250, 310, 280, 420, 380, 340],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
        order: 2,
      },
      {
        type: 'line',
        label: 'Minimum Stock',
        data: [200, 250, 220, 300, 280, 260],
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        order: 1,
      },
      {
        type: 'line',
        label: 'Maximum Stock',
        data: [400, 500, 450, 600, 550, 500],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        order: 0,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Raw Materials Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Raw Materials Inventory</h2>
          <div className="h-80">
            <Bar 
              data={rawMaterialsData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: 'Raw Materials Stock Levels'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* WIP Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Work in Progress (WIP)</h2>
          <div className="h-80">
            <Bar 
              data={wipData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: 'WIP Stock Levels'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Finished Goods Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Finished Goods Inventory</h2>
          <div className="h-80">
            <Bar 
              data={finishedGoodsData}
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: 'Finished Goods Stock Levels'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Raw Materials Status</h3>
            <p className="text-3xl font-bold">1,600</p>
            <p className="text-sm opacity-75 mt-2">Units in stock</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">WIP Status</h3>
            <p className="text-3xl font-bold">710</p>
            <p className="text-sm opacity-75 mt-2">Units in production</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Finished Goods Status</h3>
            <p className="text-3xl font-bold">1,980</p>
            <p className="text-sm opacity-75 mt-2">Units ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
