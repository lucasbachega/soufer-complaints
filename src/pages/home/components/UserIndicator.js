import { ExitToAppOutlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Dropdown,
    IconButton,
    Menu,
    MenuButton,
    Typography,
} from "@mui/joy";
import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { logout } from "../../../store/reducers/userInfoSlice";

const UserIndicator = ({ disableExit, disableUsername, sx }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const data = useSelector((state) => state?.userInfo?.data) || {};

  return (
    <Box
      borderRadius={100}
      px={1}
      height={47}
      display={"flex"}
      alignItems={"center"}
      gap={1.5}
      border={1}
      boxShadow={"sm"}
      borderColor={"divider"}
      bgcolor={"#FFF"}
      sx={sx}
    >
      <Avatar sx={{ width: 30, height: 30 }} variant="solid">
        {data?.firstname ? data?.firstname[0] : ""}
      </Avatar>
      <Box>
        <Typography level="title-md">{data?.firstname}</Typography>
        {!disableUsername && (
          <Typography color="neutral" mt={-0.5} level="body-xs">
            {data?.username}
          </Typography>
        )}
      </Box>

      {!disableExit && (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{
              root: {
                color: "danger",
                disabled: loading,
                sx: {
                  borderRadius: 100,
                },
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
      )}
    </Box>
  );
};

export default memo(UserIndicator);
