import React, { useState } from 'react';
import Form from './Form';

function FormExample() {
  const [formData, setFormData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const formFields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      validate: (value) => {
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters long';
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validate: (value) => {
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
      }
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'Regular User' },
        { value: 'guest', label: 'Guest' }
      ],
      validate: (value) => {
        if (!value) return 'Please select a role';
      }
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      validate: (value) => {
        if (!value) return 'Age is required';
        const age = Number(value);
        if (age < 18) return 'Must be at least 18 years old';
        if (age > 100) return 'Age cannot exceed 100';
      }
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      required: false,
      placeholder: 'Tell us about yourself...'
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
      validate: (value) => {
        if (!value) return 'Start date is required';
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) return 'Start date cannot be in the past';
      }
    }
  ];

  const handleSubmit = (data) => {
    setFormData(data);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Form Component Example</h2>
      
      {showSuccess && (
        <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 text-sm font-medium text-green-800">
              Form submitted successfully!
            </span>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg p-6">
        <Form
          initialValues={{
            username: '',
            email: '',
            role: '',
            age: '',
            bio: '',
            startDate: ''
          }}
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel="Submit Form"
        />
      </div>

      {formData && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Submitted Data:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default FormExample;
