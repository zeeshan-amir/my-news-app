import React from 'react';

const INPUT_SIZES = {
  small: 'py-1 px-2 text-sm',
  medium: 'py-2 px-3 text-base',
  large: 'py-3 px-4 text-lg',
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: keyof typeof INPUT_SIZES;
  label?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  inputSize = 'medium',
  label,
  className = '',
  ...props
}) => {
  const inputSizeClasses = INPUT_SIZES[inputSize] || INPUT_SIZES.medium;

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        className={`shadow appearance-none border rounded w-full ${inputSizeClasses} text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        {...props}
      />
    </div>
  );
};

export default Input;
