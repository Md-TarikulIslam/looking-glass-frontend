import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getCurrentToken } from "../redux/features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const token = useSelector(getCurrentToken);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
