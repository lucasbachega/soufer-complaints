import { ExitToAppOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  Tooltip,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { logout } from "../../../store/reducers/userInfoSlice";

const AccountBox = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.userInfo.data);

  const handleLogout = async () => {
    setLoading(true);
    const res = await HttpClient.logout();
    if (res?.ok) {
      dispatch(logout());
    } else {
      dispatch(
        setError({ title: "Erro ao sair", message: res?.error?.message })
      );
    }
    setLoading(false);
  };

  return (
    <Box
      width={"100%"}
      borderTop={1}
      borderColor={"divider"}
      p={2}
      display={"flex"}
      alignItems={"center"}
    >
      <Avatar size="sm" variant="solid">
        {data?.firstname ? data?.firstname[0]?.toUpperCase() : ""}
      </Avatar>
      <Box overflow={"hidden"} flexBasis={0} flex={1} px={2} pr={1}>
        <Typography noWrap level="title-md">
          {data?.firstname}
        </Typography>
        <Tooltip title={data?.username}>
          <Typography noWrap color="neutral" level="body-sm">
            {data?.username}
          </Typography>
        </Tooltip>
      </Box>

      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: {
              color: "danger",
              disabled: loading,
            },
          }}
        >
          <ExitToAppOutlined />
        </MenuButton>
        <Menu>
          <Box p={2}>
            <Typography mb={2} level="title-md">
              Tem certeza que deseja sair?
            </Typography>
            <Button
              loading={loading}
              disabled={loading}
              autoFocus
              onClick={handleLogout}
              color="danger"
            >
              Sair da conta
            </Button>
          </Box>
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default AccountBox;
