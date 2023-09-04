import { createRoutesFromElements, Route } from 'react-router-dom';

import { NotFound } from '../pages/404/NotFound';
import { AboutPage } from '../pages/about/About';
import { App } from '../pages/App';
import { LoginPage } from '../pages/auth/Login';
import { RegisterPage } from '../pages/auth/Register';
import { CartPage } from '../pages/cart/Cart';
import { CatalogPage } from '../pages/catalog/Catalog';
import { MainPage } from '../pages/main/Main';
import { ProductPage } from '../pages/product/ProductPage';
import { ProfilePage } from '../pages/profile/Profile';
import { AuthLayout } from './AuthLayout';
import { ProtectedNotSignRoute } from './ProtectedNotSignRoute';
import { ProtectedRoute } from './ProtectedRoute';

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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  </>,
);
