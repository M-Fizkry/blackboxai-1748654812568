import React, { useState, useEffect } from 'react';
import Input from './Input';

function Form({
  initialValues,
  fields,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel'
}) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field on change
    const field = fields.find(f => f.name === name);
    if (field && field.validate) {
      const error = field.validate(value, formData);
      setErrors(prev => ({
        ...prev,
        [name]: error || ''
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate on blur
    const field = fields.find(f => f.name === name);
    if (field) {
      let error = '';
      if (field.required && !formData[name]) {
        error = `${field.label} is required`;
      } else if (field.validate) {
        error = field.validate(formData[name], formData) || '';
      }
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.validate) {
        const error = field.validate(formData[field.name], formData);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: true
    }), {});
    setTouched(allTouched);

    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type || 'text'}
          value={formData[field.name] || ''}
          onChange={handleInputChange}
          onBlur={() => handleBlur(field.name)}
          required={field.required}
          error={touched[field.name] ? errors[field.name] : ''}
          options={field.options}
          min={field.min}
          max={field.max}
          step={field.step}
          placeholder={field.placeholder}
        />
      ))}
      
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default Form;
