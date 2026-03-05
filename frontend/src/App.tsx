import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { ConcertPage } from "./pages/all/ConcertPage";
import { Home } from "./pages/all/Home";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { UsersPage } from "./pages/admin/UsersPage";
import { OrdersPage } from "./pages/admin/OrdersPage";
import { ShowsPage } from "./pages/admin/ShowsPage";
import { SeatsPage } from "./pages/admin/SeatsPage";
import { UserLayout } from "./pages/regUser/UserLayout";
import { REG_OrdersPage } from "./pages/regUser/REG_OrdersPage";
import { PersonalData } from "./pages/regUser/PersonalData";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { getRole } from "./utility/Auth";
import { CartProvider } from "./cart/cartProvider";
import { Cart } from "./pages/all/Cart";
import { ConcertDetailsPage } from "./pages/all/ConcertDetailsPage";

function RequireRole(props: {
  user: any | null;
  allowed: number[];
  authChecked: boolean;
  children: React.ReactElement;
}) {
  if (!props.authChecked) return <div style={{ padding: 20 }}>Betöltés...</div>;
  if (!props.user) return <Navigate to="/login" replace />;

  const role = getRole(props.user);
  if (role === null || !props.allowed.includes(role))
    return <Navigate to="/" replace />;

  return props.children;
}

function AppRoutes() {
  const { user, authChecked, logout, refresh } = useAuth();

  return (
    <CartProvider>
      <BrowserRouter>
        <Header user={user} onLogout={logout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route path="/concerts" element={<ConcertPage />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <RequireRole user={user} allowed={[0]} authChecked={authChecked}>
                <AdminLayout />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="orders" replace />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="shows" element={<ShowsPage />} />
            <Route path="seats" element={<SeatsPage />} />
          </Route>

          <Route
            path="/user"
            element={
              <RequireRole user={user} allowed={[2]} authChecked={authChecked}>
                <UserLayout user={user} onLogout={logout} />
              </RequireRole>
            }
          >
            <Route index element={<Navigate to="personal" replace />} />
            <Route
              path="personal"
              element={<PersonalData onUserUpdated={() => refresh()} />}
            />
            <Route path="orders" element={<REG_OrdersPage />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/concerts/:id" element={<ConcertDetailsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
