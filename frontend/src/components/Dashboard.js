import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch('/stock')
      .then(res => res.json())
      .then(data => setStockData(data))
      .catch(err => console.error('Error fetching stock data:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Stok Barang</h1>
      <table className="min-w-full border border-gray-300 mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">MO Number</th>
            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
            <th className="border border-gray-300 px-4 py-2">Qty</th>
            <th className="border border-gray-300 px-4 py-2">Tipe</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">{item.mo_number}</td>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
              <td className="border border-gray-300 px-4 py-2">{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* TODO: Add stock charts and export buttons */}
    </div>
  );
}

export default Dashboard;
