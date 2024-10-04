import React from 'react';

export default ({
  label,
  name,
  className,
  children,
  errors = [],
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}:
        </label>
      )}
      <select
        id={name}
        name={name}
        {...props}
        className={
          `form-select w-full ${errors.length ? 'error' : ''} border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm` +
          className
      }
      >
        {children}
      </select>
      {errors && <div className="form-error">{errors}</div>}
    </div>
  );
};
