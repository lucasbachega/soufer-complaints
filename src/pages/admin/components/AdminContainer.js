import { Box } from "@mui/joy";
import React from "react";
import Sidebar from "./Sidebar";

const AdminContainer = ({ children }) => {
  return (
    <Box height={"100%"} display={"flex"} alignItems={"flex-start"}>
      <Sidebar />
      <Box flex={1} height={"100%"} display={"flex"} flexDirection={"column"}>
        <Box flex={1} flexBasis={0} height={"100%"} overflow={"auto"}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminContainer;
