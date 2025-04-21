/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const isAuthenticated = () => {
    const authData = localStorage.getItem("looking-auth");
    if (!authData) return false;

    try {
      const parsedData = JSON.parse(authData);
      return parsedData.isAuthenticated === true;
    } catch (error) {
      return false;
    }
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
