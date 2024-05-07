import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingScreen from "../../components/loading/LoadingScreen";
import Sidebar from "./components/Sidebar";
import { HttpClient } from "../../api/httpClient";
import { useSelector } from "react-redux";

const AdminWrapper = () => {
  const isLogged = useSelector((state) => state.userInfo.isLogged);

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
};

export default AdminWrapper;
