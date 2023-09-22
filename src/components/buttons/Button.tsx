import './Button.scss';

import React from 'react';

import { IButtonProps } from '../../types';

const Button: React.FC<IButtonProps> = ({
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
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
