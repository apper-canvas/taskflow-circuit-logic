import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;