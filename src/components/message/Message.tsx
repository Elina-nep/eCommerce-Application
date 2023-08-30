// import { FormErrorProps } from '../../types';
import './Message.scss';

import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/AuthProvider';

export const Message = () => {
  const { alertMessage } = useContext(AuthContext);
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
