import React from 'react';
import { FormErrorProps } from '../../types';
import './FormError.scss';

export class FormError extends React.Component<FormErrorProps> {
  render() {
    return (
      <div className="form_error">
        <p className="error_message">{this.props.message}</p>
        <p className="error_message">Please try again</p>
      </div>
    );
  }
}
