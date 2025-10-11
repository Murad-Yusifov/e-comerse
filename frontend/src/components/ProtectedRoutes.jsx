import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const isLoggedIn = auth && auth.expiresAt > Date.now();

  if (!isLoggedIn) {
    localStorage.removeItem("auth"); // cleanup expired
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
