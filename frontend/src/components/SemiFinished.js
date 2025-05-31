import React, { useState } from 'react';

function SemiFinished() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Engine Block Assembly', 
      quantity: 50, 
      stage: 'Machining',
      completionRate: 75,
      nextProcess: 'Quality Check',
      expectedCompletion: '2024-02-20'
    },
    { 
      id: 2, 
      name: 'Circuit Board', 
      quantity: 200, 
      stage: 'Component Assembly',
      completionRate: 60,
      nextProcess: 'Testing',
      expectedCompletion: '2024-02-18'
    },
    { 
      id: 3, 
      name: 'Chassis Frame', 
      quantity: 30, 
      stage: 'Welding',
      completionRate: 40,
      nextProcess: 'Painting',
      expectedCompletion: '2024-02-22'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    stage: '',
    completionRate: '',
    nextProcess: '',
    expectedCompletion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = products.length + 1;
    setProducts(prev => [...prev, { ...newProduct, id }]);
    setNewProduct({
      name: '',
      quantity: '',
      stage: '',
      completionRate: '',
      nextProcess: '',
      expectedCompletion: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Semi-Finished Goods</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Add New Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Add Semi-Finished Product</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Stage</label>
                  <input
                    type="text"
                    name="stage"
                    value={newProduct.stage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Completion Rate (%)</label>
                  <input
                    type="number"
                    name="completionRate"
                    value={newProduct.completionRate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Next Process</label>
                  <input
                    type="text"
                    name="nextProcess"
                    value={newProduct.nextProcess}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Completion</label>
                  <input
                    type="date"
                    name="expectedCompletion"
                    value={newProduct.expectedCompletion}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stage</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Progress</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Next Process</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Expected Completion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{product.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.quantity}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.stage}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-gray-800 h-2.5 rounded-full" 
                              style={{ width: `${product.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs ml-2">{product.completionRate}%</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.nextProcess}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.expectedCompletion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SemiFinished;
