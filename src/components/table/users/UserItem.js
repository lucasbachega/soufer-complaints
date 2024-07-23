import { DeleteOutline, KeyOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  Sheet,
  Stack,
  Tooltip,
  Typography,
} from "@mui/joy";
import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";
import ChangePassword from "./modals/ChangePassword";
import CreateUserModal from "./modals/ModalUser";

const permissions = {
  admin: "ADM",
  gestor: "Gestor",
};

const RemoveButton = memo(({ userId, onRemove = () => {} }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    const res = await HttpClient.admin.deleteUser(userId);
    if (res?.ok) {
      dispatch(openSnackbar({ message: "Usuário removido" }));
      onRemove(userId);
    } else {
      dispatch(
        setError({
          title: "Erro ao remover usuário",
          message: res?.error?.message,
        })
      );
    }
    setLoading(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown>
        <MenuButton variant="plain" color="danger" slots={{ root: IconButton }}>
          <DeleteOutline />
        </MenuButton>
        <Menu sx={{ width: 300 }}>
          <Box p={2}>
            <Typography level="title-md">
              Tem certeza que deseja remover o usuário?
            </Typography>
            <Stack direction={"row"} alignItems={"center"} mt={2} gap={1}>
              <Button
                loading={loading}
                onClick={handleRemove}
                autoFocus
                variant="solid"
                color="danger"
              >
                Remover
              </Button>
            </Stack>
          </Box>
        </Menu>
      </Dropdown>
    </div>
  );
});

const ChangePasswordButton = memo(({ firstname, username, email, userId }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Redefinir senha">
        <IconButton
          sx={{ mr: -1 }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        >
          <KeyOutlined />
        </IconButton>
      </Tooltip>

      <ChangePassword
        open={open}
        onClose={() => setOpen(false)}
        firstname={firstname}
        username={username}
        email={email}
        userId={userId}
      />
    </>
  );
});

const UserItem = ({ row = {}, onRemove = () => {} }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  const [copyData, setCopyData] = useState(row);

  const handleEditSave = async (data = {}) => {
    const res = await HttpClient.admin.updateUser(row?.id, data);
    if (res?.ok) {
      dispatch(openSnackbar({ message: "Usuário salvo" }));
      setCopyData((prev) => ({ ...prev, ...data }));
    } else {
      dispatch(
        setError({
          title: "Erro ao salvar usuário",
          message: res?.error?.message,
        })
      );
    }
  };

  const handleRemove = useCallback((userId) => {
    onRemove(userId);
    setCopyData(null);
  }, []);

  return (
    Boolean(copyData) && (
      <React.Fragment>
        <Sheet
          onClick={() => setEditModal(true)}
          variant="outlined"
          sx={{
            p: 1,
            px: 2,
            pr: 1,
            borderRadius: "sm",
            width: "100%",
            maxWidth: 1000,
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            ":hover": {
              boxShadow: "sm",
            },
          }}
        >
          <Avatar variant="solid" size="sm" sx={{ mr: 1, fontWeight: "700" }}>
            {copyData?.firstname ? copyData?.firstname[0] : ""}
          </Avatar>
          <Box flex={1}>
            <Typography noWrap level="title-md" fontWeight={"600"}>
              {copyData?.firstname}
            </Typography>
            <Typography noWrap mt={-0.2} color="neutral" level="body-xs">
              {copyData?.email}
            </Typography>
          </Box>
          <Typography noWrap level="body-xs">
            {[
              "Representante",
              ...copyData?.roles?.map((role) => permissions[role]),
            ]?.join(", ")}
          </Typography>
          <Divider
            orientation="vertical"
            sx={{ height: 20, alignSelf: "center", ml: 1 }}
          />
          <ChangePasswordButton
            userId={row?.id}
            firstname={copyData?.firstname}
            username={copyData?.username}
            email={copyData?.email}
          />
          <RemoveButton userId={row?.id} onRemove={handleRemove} />
        </Sheet>
        {editModal && (
          <CreateUserModal
            editMode
            open={editModal}
            onClose={() => setEditModal(false)}
            initialData={copyData}
            userId={row?.id}
            onConfirm={handleEditSave}
          />
        )}
      </React.Fragment>
    )
  );
};

export default memo(UserItem);
