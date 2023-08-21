import React from 'react';
import { FormErrorProps } from '../../types';
import './FormError.scss';

export const FormError: React.FC<FormErrorProps> = (props) => {
  return (
    <div className="form_error">
      <p className="error_message">⚠️ {props.message} ⚠️</p>
      <p className="error_message">Please try again</p>
    </div>
  );
};
