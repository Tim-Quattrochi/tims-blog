import { Navigate, Outlet } from "react-router-dom";
import { useProvideAuth } from "../hooks/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
const PrivateRoute = () => {
  const {
    state: { isAuthenticated },
    isLoading,
  } = useProvideAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
