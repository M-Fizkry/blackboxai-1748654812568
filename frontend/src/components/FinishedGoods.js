import React, { useState } from 'react';

function FinishedGoods() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Industrial Motor', 
      sku: 'IM-2024-001',
      quantity: 25,
      price: 1200.00,
      location: 'Warehouse A',
      lastInspection: '2024-02-10',
      status: 'Available'
    },
    { 
      id: 2, 
      name: 'Control Panel', 
      sku: 'CP-2024-002',
      quantity: 50,
      price: 850.00,
      location: 'Warehouse B',
      lastInspection: '2024-02-12',
      status: 'Reserved'
    },
    { 
      id: 3, 
      name: 'Power Unit', 
      sku: 'PU-2024-003',
      quantity: 15,
      price: 2200.00,
      location: 'Warehouse A',
      lastInspection: '2024-02-15',
      status: 'Available'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    quantity: '',
    price: '',
    location: '',
    lastInspection: '',
    status: 'Available'
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
      sku: '',
      quantity: '',
      price: '',
      location: '',
      lastInspection: '',
      status: 'Available'
    });
    setShowAddForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Finished Goods</h1>
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
                <h3 className="text-lg font-medium">Add Finished Product</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
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
                  <label className="block text-sm font-medium text-gray-700">SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={newProduct.sku}
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
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newProduct.location}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Inspection Date</label>
                  <input
                    type="date"
                    name="lastInspection"
                    value={newProduct.lastInspection}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={newProduct.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
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
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SKU</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Inspection</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{product.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.sku}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.quantity}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.location}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.lastInspection}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                        </td>
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

export default FinishedGoods;
