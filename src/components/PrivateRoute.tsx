import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Vérifier si nous sommes en mode développement
  const isDevelopment = process.env.NODE_ENV === "development";

  // Permettre l'accès en développement, sinon vérifier l'authentification
  if (!isAuthenticated && !isDevelopment) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
