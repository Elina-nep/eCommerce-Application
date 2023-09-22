import './Message.scss';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { StoreType } from '../../store';

export const Message = () => {
  const alertMessage = useSelector(
    (state: StoreType) => state.alertMessage.alertMessage,
  );
  const [messageStyles, setMessageStyles] = useState('message');
  useEffect(() => {
    if (alertMessage) {
      setTimeout(() => {
        setMessageStyles('message message_animated');
        setTimeout(() => {
          setMessageStyles('message');
        }, 2000);
      }, 200);
    }
  }, [alertMessage]);
  return (
    <>
      {alertMessage && (
        <div className={messageStyles}>
          <div className="message__container">
            <p className="message__title">{alertMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};
