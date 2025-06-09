import React from 'react';
import Input from '@/components/atoms/Input';

const FormField = ({ label, id, children, className = '', ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {/* If children exist, clone them and pass props; otherwise render Input atom */}
      {children ? (
        React.cloneElement(children, { id, ...props })
      ) : (
        <Input id={id} {...props} />
      )}
    </div>
  );
};

export default FormField;