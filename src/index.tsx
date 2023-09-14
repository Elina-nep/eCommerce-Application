import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { routerObj } from './router/RouterConfig';
import { store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createHashRouter(routerObj, {
  basename: '/',
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />,
    </Provider>
  </React.StrictMode>,
);
