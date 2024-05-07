import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  Sheet,
  Stack,
  Switch,
  Typography,
} from "@mui/joy";
import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import { setError } from "../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../store/reducers/snackbarBaseSlice";
import SectorModal from "./modals/SectorModal";

const RemoveButton = memo(({ sectorId, onRemove = () => {} }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    const res = await HttpClient.admin.deleteSetor(sectorId);
    if (res?.ok) {
      dispatch(openSnackbar({ message: "Setor removido" }));
      onRemove(sectorId);
    } else {
      dispatch(
        setError({
          title: "Erro ao remover setor",
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
              Tem certeza que deseja remover o setor?
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

const ToggleActive = memo(({ sectorId, initialChecked, onToggleActive }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(Boolean(initialChecked));

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    const toValue = !checked;
    setChecked(toValue);
    const res = await HttpClient.admin.setActiveSetor(sectorId, toValue);
    if (!res.ok) {
      setChecked(initialChecked);
      dispatch(
        setError({
          title: `Erro ao ${toValue ? "ativar" : "desativar"} setor`,
          message: res?.error?.message,
        })
      );
    } else {
      onToggleActive(toValue);
    }
    setLoading(false);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      component={"div"}
      border={1}
      borderColor={"divider"}
      p={1}
      px={2}
      borderRadius={100}
      onClick={(e) => e.stopPropagation()}
    >
      <Typography
        color={checked ? "primary" : "neutral"}
        mr={2}
        level="title-sm"
      >
        {loading
          ? checked
            ? "Ativando..."
            : "Desativando..."
          : checked
          ? "Ativo"
          : "Desativado"}
      </Typography>
      <Switch readOnly={loading} checked={checked} onClick={handleToggle} />
    </Box>
  );
});

const SectorItem = ({ row = {}, onRemove = () => {} }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  const [copyData, setCopyData] = useState(row);

  const handleEditSave = async (newText) => {
    const res = await HttpClient.admin.updateSetor(row?.id, {
      text: newText,
    });
    if (res?.ok) {
      dispatch(openSnackbar({ message: "Setor salvo" }));
      setCopyData((prev) => ({ ...prev, text: newText }));
    } else {
      dispatch(
        setError({
          title: "Erro ao salvar setor",
          message: res?.error?.message,
        })
      );
    }
  };

  const handleRemove = useCallback((sectorId) => {
    onRemove(sectorId);
    setCopyData(null);
  }, []);

  const handleToggleActive = useCallback((bool) => {
    setCopyData((prev) => ({ ...prev, active: bool }));
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
            borderRadius: "sm",
            width: "100%",
            maxWidth: 900,
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            ":hover": {
              boxShadow: "sm",
            },
          }}
        >
          <Typography level="title-md">{copyData?.text}</Typography>
          <Box flex={1} />
          <IconButton>
            <Edit />
          </IconButton>
          <RemoveButton sectorId={row?.id} onRemove={handleRemove} />
          <Divider orientation="vertical" sx={{ mx: 1 }} />
          <ToggleActive
            sectorId={row?.id}
            initialChecked={Boolean(copyData?.active)}
            onToggleActive={handleToggleActive}
          />
        </Sheet>
        <SectorModal
          editMode
          open={editModal}
          onClose={() => setEditModal(false)}
          defaultText={copyData?.text}
          sectorId={row?.id}
          onConfirm={handleEditSave}
        />
      </React.Fragment>
    )
  );
};

export default memo(SectorItem);
