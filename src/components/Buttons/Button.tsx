import React from 'react';

const BUTTON_TYPES = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary text-white hover:bg-secondary-dark',
  danger: 'bg-danger text-white hover:bg-danger-dark',
};

const BUTTON_SIZES = {
  small: 'py-1 px-3 text-sm',
  medium: 'py-2 px-4 text-base',
  large: 'py-3 px-6 text-lg',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: keyof typeof BUTTON_TYPES;
  buttonSize?: keyof typeof BUTTON_SIZES;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  buttonType = 'primary',
  buttonSize = 'medium',
  disabled = false,
  onClick,
  children,
  className = '',
  ...props
}) => {
  const buttonTypeClasses = BUTTON_TYPES[buttonType] || BUTTON_TYPES.primary;
  const buttonSizeClasses = BUTTON_SIZES[buttonSize] || BUTTON_SIZES.medium;

  return (
    <button
      type={type}
      className={`rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonTypeClasses} ${buttonSizeClasses} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
