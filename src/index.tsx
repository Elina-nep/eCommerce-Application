import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { routerObj } from './router/RouterConfig';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createHashRouter(routerObj, {
  basename: '/',
});

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
