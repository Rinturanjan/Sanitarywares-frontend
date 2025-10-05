import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Orders from "./pages/Orders.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard.jsx";
import ManageProducts from "./pages/Dashboard/Admin/ManageProducts.jsx";
import ManageOrders from "./pages/Dashboard/Admin/ManageOrders.jsx";
import ManageUsers from "./pages/Dashboard/Admin/ManageUsers.jsx";
import UserDashboard from "./pages/Dashboard/User/UserDashboard.jsx";
import UserOrders from "./pages/Dashboard/User/UserOrders.jsx";
import UserProfile from "./pages/Dashboard/User/UserProfile.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Suspense } from "react";

export default function AppRoutes() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute role="user">
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="wishlist" element={<Wishlist />} />

        <Route
          path="orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/signup" element={<Register />} />
      </Route>

      {/* Dashboard Layout (protected) */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* User */}
        <Route
          path="user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/orders"
          element={
            <ProtectedRoute role="user">
              <UserOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="user/profile"
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {/* Admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/products"
          element={
            <ProtectedRoute role="admin">
              <ManageProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <ProtectedRoute role="admin">
              <ManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
  );
}
