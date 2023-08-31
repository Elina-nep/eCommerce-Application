import './Button.scss';

import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => {
        !disabled && onClick && onClick();
      }}
      className={className + ' button'}
    >
      {children}
    </button>
  );
};

export default Button;
