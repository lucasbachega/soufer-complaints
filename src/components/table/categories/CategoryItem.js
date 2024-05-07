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
import CategoryModal from "./modals/CategoryModal";

const RemoveButton = memo(({ categoryId, onRemove = () => {} }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    setLoading(true);
    const res = await HttpClient.admin.deleteCategoria(categoryId);
    if (res?.ok) {
      dispatch(openSnackbar({ message: "Categoria removida" }));
      onRemove(categoryId);
    } else {
      dispatch(
        setError({
          title: "Erro ao remover categoria",
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
              Tem certeza que deseja remover a categoria?
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

const ToggleActive = memo(({ categoryId, initialChecked, onToggleActive }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(Boolean(initialChecked));

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    const toValue = !checked;
    setChecked(toValue);
    const res = await HttpClient.admin.setActiveCategoria(categoryId, toValue);
    if (!res.ok) {
      setChecked(initialChecked);
      dispatch(
        setError({
          title: `Erro ao ${toValue ? "ativar" : "desativar"} categoria`,
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

const ProductItem = ({ row = {}, onRemove = () => {} }) => {
  const dispatch = useDispatch();
  const [editModal, setEditModal] = useState(false);

  const [copyData, setCopyData] = useState(row);

  const handleEditSave = async (newText) => {
    const res = await HttpClient.admin.updateCategoria(row?.id, {
      text: newText,
    });
    if (res?.ok) {
      dispatch(openSnackbar({ message: "Categoria salva" }));
      setCopyData((prev) => ({ ...prev, text: newText }));
    } else {
      dispatch(
        setError({
          title: "Erro ao salvar categoria",
          message: res?.error?.message,
        })
      );
    }
  };

  const handleRemove = useCallback((categoryId) => {
    onRemove(categoryId);
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
          <RemoveButton categoryId={row?.id} onRemove={handleRemove} />
          <Divider orientation="vertical" sx={{ mx: 1 }} />
          <ToggleActive
            categoryId={row?.id}
            initialChecked={Boolean(copyData?.active)}
            onToggleActive={handleToggleActive}
          />
        </Sheet>
        <CategoryModal
          editMode
          open={editModal}
          onClose={() => setEditModal(false)}
          defaultText={copyData?.text}
          categoryId={row?.id}
          onConfirm={handleEditSave}
        />
      </React.Fragment>
    )
  );
};

export default memo(ProductItem);
