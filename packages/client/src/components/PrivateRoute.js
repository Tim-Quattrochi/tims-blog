import { Navigate, Outlet } from "react-router-dom";
import { useProvideAuth } from "../hooks/AuthProvider";
const PrivateRoute = () => {
  const {
    state: { isAuthenticated },
  } = useProvideAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
