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
            <ProtectedRoute>
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
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="my-orders" element={<MyOrdersPage />} />
        <Route path="my-orders/:id" element={<div>test</div>} />
      </Route>
      <Route path="order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<DashboardProductPage />} />
        <Route path="categories" element={<DashboardCategoriesPage />} />
        <Route path="orders" element={<DashboardOrdersPage />} />
      </Route>
    </>,
  ),
);

export default router;
