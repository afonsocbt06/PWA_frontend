import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isValidLogin, role, isFetching, hasLogin } = useAuth();

  useEffect(() => {
    hasLogin();
  }, [hasLogin]);

  if (isFetching) {
    return <div>Loading</div>;
  }

  const hasRequiredRole =
    !requiredRole ||
    (requiredRole === "user"
      ? role.some((value) => value === "member" || value === "notmember")
      : role.includes(requiredRole));

  if (!isValidLogin || !hasRequiredRole) {
    // user is not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
