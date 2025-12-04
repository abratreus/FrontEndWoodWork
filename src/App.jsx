import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Catalogo from "./pages/Catalog.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import AdminHome from './pages/Admin/AdminHome.jsx';
import AdminProdutos from './pages/Admin/AdminProdutos';
import AdminUsuarios from './pages/Admin/AdminUsuarios';
import Footer from "./components/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute  from "./components/ProtectedRoute.jsx"

import "./App.css";

const LayoutComNavbar = ({ children }) => {
  const location = useLocation();

  const rotasSemNavbar = ['/', '/register', '/notfound'];
  const rotasSemFooter = ['/', '/register', '/admin', '/admin/produtos', '/admin/usuarios', '/notfound'];

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
      <AlertProvider>
        <AuthProvider>
          <BrowserRouter>
            <LayoutComNavbar>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/catalogo" element={<Catalogo />} />
                {/* <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/produtos" element={<ProtectedRoute requiredRole="admin"><AdminProdutos /></ProtectedRoute>} />
                <Route path="/admin/usuarios" element={<ProtectedRoute requiredRole="admin"><AdminUsuarios /></ProtectedRoute>} /> */}
                <Route path="/admin/produtos" element=<AdminProdutos/>/>
                <Route path="/admin/usuarios" element=<AdminUsuarios/>/>
                <Route path="/admin" element=<AdminHome/>/>
                <Route path="*" element={<Navigate to="/notfound" replace />} />
                <Route path="/notfound" element={<NotFound />} />
              </Routes>
            </LayoutComNavbar>
          </BrowserRouter>
        </AuthProvider>
      </AlertProvider>
    </ErrorBoundary>
  );
}

export default App;