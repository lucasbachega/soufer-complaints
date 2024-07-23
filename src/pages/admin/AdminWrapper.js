import { Box } from "@mui/joy";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchSectors } from "../../store/reducers/sectorsSlice";
import { fetchUnits } from "../../store/reducers/unitsSlice";
import Sidebar from "./components/Sidebar";

const AdminWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchSectors());
  }, []);

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
