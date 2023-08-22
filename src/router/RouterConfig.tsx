import { createRoutesFromElements, Route } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { App } from '../pages/App';
import { NotFound } from '../pages/404/NotFound';
import { MainPage } from '../pages/main/Main';
import { LoginPage } from '../pages/auth/Login';
import { RegisterPage } from '../pages/auth/Register';
import { CatalogPage } from '../pages/catalog/Catalog';
import { ProfilePage } from '../pages/profile/Profile';
import { ProtectedNotSignRoute } from './ProtectedNotSignRoute';

export const routerObj = createRoutesFromElements(
  <>
    <Route element={<AuthLayout />}>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedNotSignRoute />}>
          <Route path="/me" element={<ProfilePage />} />
        </Route>
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  </>,
);
