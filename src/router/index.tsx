import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import CheckoutPage from '@/pages/CheckoutPage';
import DashboardPage from '@/pages/dashboard';
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import DashboardProductPage from '@/pages/dashboard/DashboardProudctPage';
import DashboardCategoriesPage from '@/pages/dashboard/DashboardCategoiresPage';
import HomePage from '@/pages/HomePage';
import RootLayout from '@/pages/Layout';
import LoginPage from '@/pages/LoginPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import ProductsDetailsPage from '@/pages/ProductsDetailsPage';
import ProductsPage from '@/pages/ProductsPage';
import RegisterPage from '@/pages/RegisterPage';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import DashboardOrdersPage from '@/pages/dashboard/DashboardOrdersPage';
import MyOrdersPage from '@/pages/MyOrderPage';
import CookieServices from '@/classes/CookieServices';

const user = CookieServices.get('user');

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductsDetailsPage />} />
        <Route
          path="login"
          element={
            <ProtectedRoute loginOrSignup>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute loginOrSignup>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-orders"
          element={
            <ProtectedRoute loginOrSignup>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-orders/:id"
          element={
            <ProtectedRoute loginOrSignup>
              <div>test</div>
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="order-confirmation"
        element={
          <ProtectedRoute loginOrSignup>
            <OrderConfirmationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute admin={user?.role?.name === 'Admin'}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<DashboardProductPage />} />
        <Route path="categories" element={<DashboardCategoriesPage />} />
        <Route path="orders" element={<DashboardOrdersPage />} />
      </Route>
    </>,
  ),
);

export default router;
