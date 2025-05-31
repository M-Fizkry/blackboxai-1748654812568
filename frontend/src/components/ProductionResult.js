import React, { useState } from 'react';
import { usePlanning } from '../context/PlanningContext';

function ProductionResult() {
  const { planningData, updateProductionResult } = usePlanning();

  // Get all MO data from planning
  const allMOData = Object.values(planningData).reduce((acc, plan) => {
    plan.data.forEach(item => {
      acc[item.numberMO] = {
        itemNumber: item.itemNumber,
        itemName: item.itemName,
        planningQty: item.planningQty,
        actualProd: item.actualProd || 0
      };
    });
    return acc;
  }, {});

  const [formData, setFormData] = useState({
    numberMO: '',
    shop: '',
    itemNumber: '',
    itemName: '',
    quantity: '',
    productionDate: new Date().toISOString().split('T')[0],
    shift: '1',
    operator: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };

      // If MO number changes, update item details automatically
      if (name === 'numberMO') {
        const moDetails = allMOData[value] || { itemNumber: '', itemName: '' };
        newData.itemNumber = moDetails.itemNumber;
        newData.itemName = moDetails.itemName;
      }

      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if MO exists in planning
    if (!allMOData[formData.numberMO]) {
      alert('MO Number not found in planning data');
      return;
    }

    // Check if quantity is within remaining plan
    const moDetails = allMOData[formData.numberMO];
    const remaining = moDetails.planningQty - moDetails.actualProd;
    if (Number(formData.quantity) > remaining) {
      alert(`Cannot exceed remaining planned quantity (${remaining})`);
      return;
    }
    
    // Update production result in planning data
    updateProductionResult(formData.numberMO, formData.quantity);
    
    // Reset form
    setFormData({
      numberMO: '',
      shop: '',
      itemNumber: '',
      itemName: '',
      quantity: '',
      productionDate: new Date().toISOString().split('T')[0],
      shift: '1',
      operator: ''
    });
  };

  // Get remaining quantity for selected MO
  const getMaxQuantity = (moNumber) => {
    const moDetails = allMOData[moNumber];
    if (!moDetails) return 0;
    return moDetails.planningQty - moDetails.actualProd;
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Input Production Result</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MO Number - Manual Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MO Number
                </label>
                <input
                  type="text"
                  name="numberMO"
                  value={formData.numberMO}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="Enter MO number"
                  list="mo-list"
                />
                <datalist id="mo-list">
                  {Object.keys(allMOData).map(mo => (
                    <option key={mo} value={mo} />
                  ))}
                </datalist>
              </div>

              {/* Shop - Manual Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shop
                </label>
                <input
                  type="text"
                  name="shop"
                  value={formData.shop}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="Enter shop"
                />
              </div>

              {/* Item Number - Automatic */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Number
                </label>
                <input
                  type="text"
                  value={formData.itemNumber}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  readOnly
                />
              </div>

              {/* Item Name - Automatic */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  value={formData.itemName}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  readOnly
                />
              </div>

              {/* Production Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Production Date
                </label>
                <input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Shift */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shift
                </label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="1">Shift 1</option>
                  <option value="2">Shift 2</option>
                  <option value="3">Shift 3</option>
                </select>
              </div>

              {/* Operator */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Operator
                </label>
                <input
                  type="text"
                  name="operator"
                  value={formData.operator}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="Enter operator name"
                />
              </div>

              {/* Quantity - Manual Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="1"
                  max={getMaxQuantity(formData.numberMO)}
                  placeholder="Enter quantity"
                />
                {formData.numberMO && (
                  <p className="mt-1 text-sm text-gray-500">
                    Maximum: {getMaxQuantity(formData.numberMO)} units
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Production Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductionResult;
