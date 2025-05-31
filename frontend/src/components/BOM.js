import React, { useState } from 'react';

function BOM() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [products] = useState([
    {
      id: 1,
      name: 'Industrial Motor',
      components: [
        {
          type: 'Raw Material',
          name: 'Steel Sheets',
          quantity: 4,
          unit: 'sheets'
        },
        {
          type: 'Semi-Finished',
          name: 'Motor Windings',
          quantity: 1,
          unit: 'set'
        },
        {
          type: 'Raw Material',
          name: 'Copper Wire',
          quantity: 200,
          unit: 'meters'
        }
      ]
    },
    {
      id: 2,
      name: 'Control Panel',
      components: [
        {
          type: 'Semi-Finished',
          name: 'Circuit Board',
          quantity: 1,
          unit: 'piece'
        },
        {
          type: 'Raw Material',
          name: 'Plastic Housing',
          quantity: 1,
          unit: 'piece'
        }
      ]
    }
  ]);

  const [newBOM, setNewBOM] = useState({
    productName: '',
    components: [{ type: 'Raw Material', name: '', quantity: '', unit: '' }]
  });

  const handleInputChange = (e, index) => {
    if (e.target.name === 'productName') {
      setNewBOM(prev => ({
        ...prev,
        productName: e.target.value
      }));
    } else {
      const components = [...newBOM.components];
      components[index] = {
        ...components[index],
        [e.target.name]: e.target.value
      };
      setNewBOM(prev => ({
        ...prev,
        components
      }));
    }
  };

  const addComponent = () => {
    setNewBOM(prev => ({
      ...prev,
      components: [...prev.components, { type: 'Raw Material', name: '', quantity: '', unit: '' }]
    }));
  };

  const removeComponent = (index) => {
    setNewBOM(prev => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setShowAddForm(false);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Bill of Materials</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Create New BOM
          </button>
        </div>

        {/* Product Selection */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Product</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors duration-200 ${
                  selectedProduct?.id === product.id ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {product.components.length} components
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* BOM Details */}
        {selectedProduct && (
          <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                BOM for {selectedProduct.name}
              </h3>
            </div>
            <div className="px-6 py-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Component</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedProduct.components.map((component, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          component.type === 'Raw Material' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {component.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{component.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{component.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{component.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add BOM Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Create New BOM</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newBOM.productName}
                    onChange={(e) => handleInputChange(e)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Components</h4>
                    <button
                      type="button"
                      onClick={addComponent}
                      className="text-sm text-gray-800 hover:text-gray-600"
                    >
                      + Add Component
                    </button>
                  </div>

                  {newBOM.components.map((component, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <select
                          name="type"
                          value={component.type}
                          onChange={(e) => handleInputChange(e, index)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        >
                          <option value="Raw Material">Raw Material</option>
                          <option value="Semi-Finished">Semi-Finished</option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          name="name"
                          placeholder="Component Name"
                          value={component.name}
                          onChange={(e) => handleInputChange(e, index)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          name="quantity"
                          placeholder="Qty"
                          value={component.quantity}
                          onChange={(e) => handleInputChange(e, index)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="text"
                          name="unit"
                          placeholder="Unit"
                          value={component.unit}
                          onChange={(e) => handleInputChange(e, index)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        />
                      </div>
                      {newBOM.components.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeComponent(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
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
                    Create BOM
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BOM;
