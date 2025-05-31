import React, { useState } from 'react';

function ProductionResultForm({ planData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    actualProd: planData.actualProd || '',
    notes: '',
    productionDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...planData,
      actualProd: Number(formData.actualProd),
      notes: formData.notes,
      productionDate: formData.productionDate
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'actualProd' ? value : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Input Production Result</h2>
        
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Plan Date</label>
              <p className="mt-1 text-sm text-gray-900">{planData.planDate}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">MO Number</label>
              <p className="mt-1 text-sm text-gray-900">{planData.numberMO}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Number</label>
              <p className="mt-1 text-sm text-gray-900">{planData.itemNumber}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Name</label>
              <p className="mt-1 text-sm text-gray-900">{planData.itemName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Planning Qty</label>
              <p className="mt-1 text-sm text-gray-900">{planData.planningQty}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="productionDate" className="block text-sm font-medium text-gray-700">
                Production Date
              </label>
              <input
                type="date"
                id="productionDate"
                name="productionDate"
                value={formData.productionDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="actualProd" className="block text-sm font-medium text-gray-700">
                Actual Production
              </label>
              <input
                type="number"
                id="actualProd"
                name="actualProd"
                value={formData.actualProd}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add any production notes here..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Save Result
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductionResultForm;
