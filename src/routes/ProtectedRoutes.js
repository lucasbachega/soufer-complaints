import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isLogged = useSelector((state) => state.userInfo.isLogged);

  if (!isLogged) {
    return <Navigate to={"/login"} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoutes;
