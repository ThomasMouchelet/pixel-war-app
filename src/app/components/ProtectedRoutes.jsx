import { getTokenFromLocalstorage } from "../../setup/utils/authorization";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = getTokenFromLocalstorage();

  if (!token) {
    return <Navigate to="/connexion" />;
  }
  const currentTime = Math.floor(Date.now() / 1000);

  return children;
};

export default ProtectedRoute;
