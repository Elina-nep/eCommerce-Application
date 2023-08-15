import React from 'react';
import { FormErrorProps } from '../../types';
import './FormError.css';

export class FormError extends React.Component<FormErrorProps> {
  render() {
    return (
      <div>
        <p className="error_message">{this.props.message}</p>
        <p className="error_message">Please try again</p>
      </div>
    );
  }
}
