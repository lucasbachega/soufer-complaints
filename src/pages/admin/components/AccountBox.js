import { ExitToAppOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Tooltip, Typography } from "@mui/joy";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/reducers/userInfoSlice";

const AccountBox = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.userInfo.data);

  return (
    <Box
      width={"100%"}
      borderTop={1}
      borderColor={"divider"}
      p={2}
      display={"flex"}
      alignItems={"center"}
    >
      <Avatar color="primary">
        {data?.firstname ? data?.firstname[0]?.toUpperCase() : ""}
      </Avatar>
      <Box overflow={"hidden"} flexBasis={0} flex={1} px={1}>
        <Typography noWrap level="title-md">
          {data?.firstname}
        </Typography>
        <Tooltip title={data?.username}>
          <Typography noWrap color="neutral" level="body-sm">
            {data?.username}
          </Typography>
        </Tooltip>
      </Box>
      <Tooltip title="Sair">
        <IconButton onClick={() => dispatch(logout())}>
          <ExitToAppOutlined />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default AccountBox;
