import React from 'react';

function PlanningForm({ data, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(data || {
    planDate: new Date().toISOString().split('T')[0],
    numberMO: '',
    itemNumber: '',
    itemName: '',
    planningQty: '',
    actualProd: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['planningQty', 'actualProd'].includes(name) ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="planDate" className="block text-sm font-medium text-gray-700">
            Plan Date
          </label>
          <input
            type="date"
            id="planDate"
            name="planDate"
            value={formData.planDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="numberMO" className="block text-sm font-medium text-gray-700">
            Number MO
          </label>
          <input
            type="text"
            id="numberMO"
            name="numberMO"
            value={formData.numberMO}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="itemNumber" className="block text-sm font-medium text-gray-700">
            Item Number
          </label>
          <input
            type="text"
            id="itemNumber"
            name="itemNumber"
            value={formData.itemNumber}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="planningQty" className="block text-sm font-medium text-gray-700">
            Planning Qty
          </label>
          <input
            type="number"
            id="planningQty"
            name="planningQty"
            value={formData.planningQty}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
        </div>

        <div>
          <label htmlFor="actualProd" className="block text-sm font-medium text-gray-700">
            Actual Prod
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
          Save
        </button>
      </div>
    </form>
  );
}

export default PlanningForm;
