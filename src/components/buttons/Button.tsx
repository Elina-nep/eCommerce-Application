import './Button.scss';

import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={className + ' button'}>
      {children}
    </button>
  );
};

export default Button;
