import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Catalog from "./pages/Catalog.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AdminDashboard from './pages/Admin/AdminHome.jsx';
import AdminProdutos from './pages/Admin/AdminProdutos';
import AdminUsuarios from './pages/Admin/AdminUsuarios';
import Footer from "./components/Footer.jsx";

import "./App.css";

const LayoutComNavbar = ({ children }) => {
  const location = useLocation();

  const rotasSemNavbar = ['/', '/register', '/admin'];
  const rotasSemFooter = ['/', '/register', '/admin', '/admin/produtos', '/admin/usuarios'];

  const mostrarNavbar = !rotasSemNavbar.includes(location.pathname);
  const mostrarFooter = !rotasSemFooter.includes(location.pathname);

  return (
    <>
      {mostrarNavbar && <Navbar />}
      {children}
      {mostrarFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LayoutComNavbar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/produtos" element={<AdminProdutos />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          </Routes>
        </LayoutComNavbar>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;