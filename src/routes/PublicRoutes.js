import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const isLogged = useSelector((state) => state.userInfo.isLogged);

  if (isLogged) {
    return <Navigate to={"/home"} replace />;
  } else {
    return children;
  }
};

export default PublicRoutes;
