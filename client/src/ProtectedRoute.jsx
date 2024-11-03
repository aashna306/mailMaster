import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);

  return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
