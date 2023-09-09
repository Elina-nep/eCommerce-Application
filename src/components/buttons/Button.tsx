import './Button.scss';

import React from 'react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={(e?) => {
        if (e) e.stopPropagation();
        !disabled && onClick && onClick(e);
      }}
      className={className + ' button'}
    >
      {children}
    </button>
  );
};

export default Button;
