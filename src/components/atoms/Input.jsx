import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
      {...props}
    />
  );
};

export default Input;