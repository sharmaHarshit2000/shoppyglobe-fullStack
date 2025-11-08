import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // If not authenticated, redirect to login and remember the page they tried to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, allow access to the requested element
  return element;
}

export default ProtectedRoute;
