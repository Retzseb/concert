import { useMemo, useState } from "react";
import { Concerts } from "./components/Concert";
import { Login } from "./pages/LogInOut";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { UsersPage } from "./pages/admin/UsersPage";
import { OrdersPage } from "./pages/admin/OrdersPage";
import { ShowsPage } from "./pages/admin/ShowsPage";
import { SeatsPage } from "./pages/admin/SeatsPage";

function App() {
  return (
    <>

<BrowserRouter>
<Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="shows" element={<ShowsPage />} />
          <Route path="seats" element={<SeatsPage />} />
        </Route>
        
</Routes>

</BrowserRouter>
        <Concerts/>
          </>
 
  );
}

export default App;