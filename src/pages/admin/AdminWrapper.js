import { Box } from "@mui/joy";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const AdminWrapper = () => {
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
};

export default AdminWrapper;
