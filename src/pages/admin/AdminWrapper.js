import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../../components/loading/LoadingScreen";
import AdminContainer from "./components/AdminContainer";

const AdminWrapper = () => {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else {
    if (isLogged) {
      return (
        <AdminContainer>
          <Outlet />
        </AdminContainer>
      );
    } else {
      return <Navigate replace to={"/auth"} />;
    }
  }
};

export default AdminWrapper;
