import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/LogInOut";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* a home lett a default page */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ha ismeretlen útvonalunk lenne valahol: */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}