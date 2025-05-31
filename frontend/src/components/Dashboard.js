import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Dashboard() {
  // Mock data for demonstration
  const stats = [
    { name: 'Total Raw Materials', value: 124, maxStock: 200, minStock: 50 },
    { name: 'Semi-Finished Goods', value: 58, maxStock: 100, minStock: 20 },
    { name: 'Finished Products', value: 89, maxStock: 150, minStock: 30 },
    { name: 'Low Stock Items', value: 12, maxStock: 50, minStock: 5 },
  ];

  const recentActivities = [
    { id: 1, type: 'Material Receipt', item: 'Steel Sheets', quantity: '500 units', timestamp: '2 hours ago' },
    { id: 2, type: 'Production Complete', item: 'Engine Parts', quantity: '200 units', timestamp: '4 hours ago' },
    { id: 3, type: 'Stock Transfer', item: 'Aluminum Rods', quantity: '300 units', timestamp: '5 hours ago' },
    { id: 4, type: 'Low Stock Alert', item: 'Copper Wire', quantity: '50 units', timestamp: '6 hours ago' },
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {item.value}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Stock Combination Chart */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Stock Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={stats}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" barSize={40} fill="#4B5563" name="Current Stock" />
              <Line type="monotone" dataKey="maxStock" stroke="#10B981" strokeWidth={2} name="Max Stock" />
              <Line type="monotone" dataKey="minStock" stroke="#EF4444" strokeWidth={2} name="Min Stock" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 bg-white shadow rounded-lg">
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">
                        {activity.item} - {activity.quantity}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <span className="text-gray-900 font-medium">Add New Material</span>
            </button>
            <button className="bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <span className="text-gray-900 font-medium">Create Production Order</span>
            </button>
            <button className="bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <span className="text-gray-900 font-medium">Generate Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
