import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import CartPage from '@/pages/CartPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import ShippingPage from '@/pages/ShippingPage'
import PaymentPage from '@/pages/PaymentPage'
import PlaceOrderPage from '@/pages/PlaceOrderPage'
import OrderPage from '@/pages/OrderPage'
import ContactPage from '@/pages/ContactPage'
import UserListPage from '@/pages/admin/UserListPage'
import UserEditPage from '@/pages/admin/UserEditPage'
import ProductListPage from '@/pages/admin/ProductListPage'
import ProductEditPage from '@/pages/admin/ProductEditPage'
import OrderListPage from '@/pages/admin/OrderListPage'
import { Result, Button } from 'antd'

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" href="/">Back Home</Button>}
  />
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search/:keyword', element: <HomePage /> },
      { path: 'search/:keyword/page/:pageNumber', element: <HomePage /> },
      { path: 'page/:pageNumber', element: <HomePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'cart/:id', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'contact', element: <ContactPage /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'shipping',
        element: (
          <ProtectedRoute>
            <ShippingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment',
        element: (
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'placeorder',
        element: (
          <ProtectedRoute>
            <PlaceOrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'order/:id',
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/userlist',
        element: (
          <AdminRoute>
            <UserListPage />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/user/:id/edit',
        element: (
          <AdminRoute>
            <UserEditPage />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/productlist',
        element: (
          <AdminRoute>
            <ProductListPage />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/productlist/:pageNumber',
        element: (
          <AdminRoute>
            <ProductListPage />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/product/:id/edit',
        element: (
          <AdminRoute>
            <ProductEditPage />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/orderlist',
        element: (
          <AdminRoute>
            <OrderListPage />
          </AdminRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
