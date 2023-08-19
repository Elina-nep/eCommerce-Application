import { createRoutesFromElements, Route } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { App } from '../pages/App';
import { NotFound } from '../pages/404/NotFound';
import { MainPage } from '../pages/main/Main';
import { LoginPage } from '../pages/auth/Login';
import { RegisterPage } from '../pages/auth/Register';

export const routerObj = createRoutesFromElements(
  <>
    <Route element={<AuthLayout />}>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  </>,
);
