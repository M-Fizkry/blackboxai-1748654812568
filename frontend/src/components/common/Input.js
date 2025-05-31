import React from 'react';

function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  error,
  options = [],
  min,
  max,
  step,
  placeholder
}) {
  const baseClasses = "mt-1 block w-full rounded-md border focus:outline-none focus:ring-2 transition duration-150 ease-in-out sm:text-sm sm:leading-5";
  const validClasses = "border-gray-300 focus:border-gray-500 focus:ring-gray-500";
  const errorClasses = "border-red-300 focus:border-red-500 focus:ring-red-500";
  const inputClasses = `${baseClasses} ${error ? errorClasses : validClasses}`;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={inputClasses}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={inputClasses}
            required={required}
            placeholder={placeholder}
            rows={4}
          />
        );

      default:
        return (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={inputClasses}
            required={required}
            min={min}
            max={max}
            step={step}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {renderInput()}
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
