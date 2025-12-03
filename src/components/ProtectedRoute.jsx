import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.perfil !== requiredRole) {
    return <Navigate to="/notfound" replace />;
  }

  return children;
}

export default ProtectedRoute;
