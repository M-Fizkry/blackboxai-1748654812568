import React, { useState } from 'react';

function FinishedGoods() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState(null);
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

  const [formData, setFormData] = useState({
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openAddForm = () => {
    setFormData({
      name: '',
      sku: '',
      quantity: '',
      price: '',
      location: '',
      lastInspection: '',
      status: 'Available'
    });
    setEditId(null);
    setShowAddForm(true);
  };

  const openEditForm = (product) => {
    setFormData({
      name: product.name,
      sku: product.sku,
      quantity: product.quantity,
      price: product.price,
      location: product.location,
      lastInspection: product.lastInspection,
      status: product.status
    });
    setEditId(product.id);
    setShowEditForm(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.quantity || !formData.price || !formData.location || !formData.lastInspection) {
      return;
    }
    const id = products.length + 1;
    setProducts(prev => [...prev, { 
      ...formData, 
      id, 
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    }]);
    setShowAddForm(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku || !formData.quantity || !formData.price || !formData.location || !formData.lastInspection) {
      return;
    }
    setProducts(prev =>
      prev.map(item =>
        item.id === editId
          ? { 
              ...formData, 
              id: editId, 
              quantity: parseInt(formData.quantity),
              price: parseFloat(formData.price)
            }
          : item
      )
    );
    setShowEditForm(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this finished good?')) {
      setProducts(prev => prev.filter(item => item.id !== id));
    }
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

  const ProductForm = ({ isEdit, onSubmit }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
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
          value={formData.sku}
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
          value={formData.quantity}
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
          value={formData.price}
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
          value={formData.location}
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
          value={formData.lastInspection}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
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
          onClick={() => isEdit ? setShowEditForm(false) : setShowAddForm(false)}
          className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          {isEdit ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Finished Goods</h1>
          <button
            onClick={openAddForm}
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
              <ProductForm isEdit={false} onSubmit={handleAddSubmit} />
            </div>
          </div>
        )}

        {/* Edit Product Form */}
        {showEditForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Edit Finished Product</h3>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              <ProductForm isEdit={true} onSubmit={handleEditSubmit} />
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
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
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
                        <td className="whitespace-nowrap px-3 py-4 text-sm space-x-2">
                          <button
                            onClick={() => openEditForm(product)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
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
