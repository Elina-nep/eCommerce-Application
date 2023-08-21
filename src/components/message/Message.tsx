import React from 'react';
import { FormErrorProps } from '../../types';
import './Message.scss';

export const Message: React.FC<FormErrorProps> = (props) => {
  return (
    <div className="message">
      <div className="message__container">
        <p className="message__title">{props.message} Message text</p>
      </div>
    </div>
  );
};
