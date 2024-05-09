import { Box } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { HttpClient } from "../../api/httpClient";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { login } from "../../store/reducers/userInfoSlice";
import Sidebar from "./components/Sidebar";

const AdminWrapper = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const isLogged = useSelector((state) => state.userInfo.isLogged);

  useEffect(() => {
    (async () => {
      const res = await HttpClient.testLogin();
      if (res?.ok) {
        dispatch(login(res?.user));
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  } else if (isLogged) {
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
    return (
      <>
        <Navigate replace to={"/admin/login"} />
        <Outlet />
      </>
    );
  }
};

export default AdminWrapper;
