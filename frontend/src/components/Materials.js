import React, { useState } from 'react';

function Materials() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Steel Sheets', quantity: 500, unit: 'sheets', minStock: 100, supplier: 'Steel Corp' },
    { id: 2, name: 'Aluminum Rods', quantity: 300, unit: 'pieces', minStock: 50, supplier: 'Metal Supplies Inc' },
    { id: 3, name: 'Copper Wire', quantity: 1000, unit: 'meters', minStock: 200, supplier: 'Wire Masters' },
    { id: 4, name: 'Plastic Granules', quantity: 750, unit: 'kg', minStock: 100, supplier: 'Polymer Solutions' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: '',
    minStock: '',
    supplier: ''
  });

  const [editId, setEditId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

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
      quantity: '',
      unit: '',
      minStock: '',
      supplier: ''
    });
    setEditId(null);
    setShowAddForm(true);
  };

  const openEditForm = (material) => {
    setFormData({
      name: material.name,
      quantity: material.quantity,
      unit: material.unit,
      minStock: material.minStock,
      supplier: material.supplier
    });
    setEditId(material.id);
    setShowEditForm(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.unit || !formData.minStock || !formData.supplier) {
      return;
    }
    const newMaterial = {
      id: materials.length + 1,
      ...formData,
      quantity: parseInt(formData.quantity),
      minStock: parseInt(formData.minStock)
    };
    setMaterials(prev => [...prev, newMaterial]);
    setShowAddForm(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.unit || !formData.minStock || !formData.supplier) {
      return;
    }
    setMaterials(prev =>
      prev.map(item =>
        item.id === editId
          ? { ...item, ...formData, quantity: parseInt(formData.quantity), minStock: parseInt(formData.minStock) }
          : item
      )
    );
    setShowEditForm(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Raw Materials</h1>
          <button
            onClick={openAddForm}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Add New Material
          </button>
        </div>

        {/* Add Material Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Add New Material</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
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
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
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
                    Add Material
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Material Form */}
        {showEditForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Edit Material</h3>
                <button
                  onClick={() => setShowEditForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
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
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
                  <input
                    type="number"
                    name="minStock"
                    value={formData.minStock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditForm(false)}
                    className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Materials Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Min Stock</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Supplier</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {materials.map((material) => (
                      <tr key={material.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{material.name}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{material.quantity}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{material.unit}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{material.minStock}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{material.supplier}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            material.quantity > material.minStock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {material.quantity > material.minStock ? 'In Stock' : 'Low Stock'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm space-x-2">
                          <button
                            onClick={() => openEditForm(material)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(material.id)}
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

export default Materials;
