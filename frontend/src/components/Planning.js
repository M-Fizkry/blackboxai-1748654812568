import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { usePlanning } from '../context/PlanningContext';

function Planning() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const fileInputRef = useRef(null);
  const { planningData, setPlanningData } = usePlanning();

  const [formData, setFormData] = useState({
    planDate: new Date().toISOString().split('T')[0],
    numberMO: '',
    itemNumber: '',
    itemName: '',
    planningQty: ''
  });

  useEffect(() => {
    if (!planId || !planningData[planId]) {
      navigate('/planning/9110');
    }
  }, [planId, navigate, planningData]);

  const plan = planningData[planId];
  if (!plan) {
    return null;
  }

  // Import from Excel
  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Transform imported data to match our format
      const transformedData = jsonData.map((row, index) => ({
        id: Math.max(...plan.data.map(item => item.id), 0) + index + 1,
        planDate: row['Plan Date'],
        numberMO: row['Number MO'],
        itemNumber: row['Item Number'],
        itemName: row['Item Name'],
        planningQty: Number(row['Planning Qty']),
        actualProd: 0
      }));

      // Update state with imported data
      setPlanningData(prev => ({
        ...prev,
        [planId]: {
          ...prev[planId],
          data: [...prev[planId].data, ...transformedData]
        }
      }));
    };

    reader.readAsArrayBuffer(file);
    // Reset file input
    event.target.value = null;
  };

  const handleAdd = () => {
    setEditingData(null);
    setFormData({
      planDate: new Date().toISOString().split('T')[0],
      numberMO: '',
      itemNumber: '',
      itemName: '',
      planningQty: ''
    });
    setShowForm(true);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setFormData(data);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setPlanningData(prev => ({
        ...prev,
        [planId]: {
          ...prev[planId],
          data: prev[planId].data.filter(item => item.id !== id)
        }
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingData) {
      setPlanningData(prev => ({
        ...prev,
        [planId]: {
          ...prev[planId],
          data: prev[planId].data.map(item => 
            item.id === editingData.id ? { ...formData, id: item.id, actualProd: item.actualProd || 0 } : item
          )
        }
      }));
    } else {
      const newId = Math.max(...plan.data.map(item => item.id), 0) + 1;
      setPlanningData(prev => ({
        ...prev,
        [planId]: {
          ...prev[planId],
          data: [...prev[planId].data, { ...formData, id: newId, actualProd: 0 }]
        }
      }));
    }
    setShowForm(false);
    setEditingData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    const exportData = plan.data.map(item => ({
      'Plan Date': item.planDate,
      'Number MO': item.numberMO,
      'Item Number': item.itemNumber,
      'Item Name': item.itemName,
      'Planning Qty': item.planningQty,
      'Actual Production': item.actualProd || 0,
      'Remaining': item.planningQty - (item.actualProd || 0)
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Planning Data');

    // Generate buffer
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Save file
    saveAs(data, `planning_${planId}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Sort data by date
  const sortedData = [...plan.data].sort((a, b) => new Date(b.planDate) - new Date(a.planDate));

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{plan.title}</h1>
          <p className="text-gray-600">{plan.description}</p>
        </div>
        <div className="flex space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleImport}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Import Excel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Export Excel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Plan
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingData ? 'Edit Plan' : 'Add New Plan'}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Plan Date
                  </label>
                  <input
                    type="date"
                    name="planDate"
                    value={formData.planDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Item Number
                  </label>
                  <input
                    type="text"
                    name="itemNumber"
                    value={formData.itemNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Planning Qty
                  </label>
                  <input
                    type="number"
                    name="planningQty"
                    value={formData.planningQty}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingData(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  {editingData ? 'Update Plan' : 'Add Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Planning Data Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number MO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Planning Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actual Prod
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(row.planDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.numberMO}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.itemNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.itemName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.planningQty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.actualProd || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.planningQty - (row.actualProd || 0)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleEdit(row)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
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
  );
}

export default Planning;
