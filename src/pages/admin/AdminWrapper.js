import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../../components/loading/LoadingScreen";
import Sidebar from "./components/Sidebar";

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
        <Box
          height={"100%"}
          width={"100%"}
          display={"flex"}
          alignItems={"flex-start"}
        >
          <Sidebar />
          <Box
            flex={1}
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box
              width={"100%"}
              flex={1}
              flexBasis={0}
              height={"100%"}
              overflow={"auto"}
              display={"flex"}
              position={"relative"}
              flexDirection={"column"}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      );
    } else {
      return <Navigate replace to={"/auth"} />;
    }
  }
};

export default AdminWrapper;
