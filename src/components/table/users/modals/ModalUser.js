import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControl,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Stack,
} from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import PasswordInput from "../../../inputs/PasswordInput";
import TextInput from "../../../inputs/TextInput";
import GestorControl from "./components/GestorControl";

const initialState = {
  firstname: "",
  username: "",
  email: "",
  password: "",
  roles: [],
};
const initialAreas = [
  {
    unidade_id: "",
    setor_id: "",
  },
];

const ModalUser = ({ open, onClose, onConfirm, editMode, initialData }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData || initialState);
  const [areas, setAreas] = useState(initialData?.areas || initialAreas || []);

  useEffect(() => {
    if (!open) {
      setData(initialData || initialState);
      setAreas(initialData?.areas || initialAreas);
    }
  }, [open]);

  const handleChangeValue = useCallback((prop, value) => {
    setData((prev) => ({ ...prev, [prop]: value }));
  }, []);

  const handleChangeRole = (value = "") => {
    if (!data?.roles?.includes(value)) {
      setData((prev) => ({ ...prev, roles: [...prev.roles, value] }));
    } else {
      setData((prev) => ({
        ...prev,
        roles: prev.roles.filter((item) => item !== value),
      }));
    }
  };

  const handleAddArea = useCallback(() => {
    setAreas((prev) => {
      return [...prev, initialAreas[0]];
    });
  }, []);

  const handleChangeArea = useCallback((index, field, value) => {
    setAreas((prev) => {
      const prevData = prev[index];
      prev.splice(index, 1, {
        ...prevData,
        [field]: value,
      });
      return [...prev];
    });
  }, []);

  const handleRemoveArea = useCallback((index) => {
    setAreas((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }, []);

  const handleConfirm = async (e) => {
    e.preventDefault();
    let formatedData = { ...data, areas };
    if (editMode) {
      delete formatedData.password;
    }
    setLoading(true);
    await onConfirm(formatedData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={(ev, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        onClose();
      }}
    >
      <ModalOverflow sx={{ overflowY: "scroll", overflowX: "hidden" }}>
        <ModalDialog minWidth={600} maxWidth={600}>
          <ModalClose />
          <DialogTitle level="h4">
            {editMode ? "Editar usuário" : "Criar usuário"}
          </DialogTitle>
          <DialogContent sx={{ overflowX: "hidden", px: 1 }}>
            <form onSubmit={handleConfirm}>
              <>
                <Stack mt={2} gap={2}>
                  <Stack direction={"row"} gap={2}>
                    <Box flex={1}>
                      <TextInput
                        required
                        label={"Nome"}
                        autoFocus
                        value={data?.firstname}
                        onChange={(value) =>
                          handleChangeValue("firstname", value)
                        }
                      />
                    </Box>
                    <Box flex={1}>
                      <TextInput
                        label={"E-mail"}
                        type={"email"}
                        value={data?.email}
                        onChange={(value) => handleChangeValue("email", value)}
                      />
                    </Box>
                  </Stack>
                  <Stack direction={"row"} gap={2}>
                    <Box maxWidth={400} flex={1}>
                      <TextInput
                        required
                        label={"Usuário de acesso"}
                        value={data?.username}
                        onChange={(value) =>
                          handleChangeValue("username", value)
                        }
                      />
                    </Box>
                    <Box flex={1}>
                      {!editMode && (
                        <PasswordInput
                          value={data?.password}
                          onChange={(value) =>
                            handleChangeValue("password", value)
                          }
                        />
                      )}
                    </Box>
                  </Stack>
                  <FormControl>
                    <Checkbox
                      sx={{ mt: 2 }}
                      label="Acesso para administrador"
                      checked={data?.roles?.includes("admin")}
                      onChange={(event) => handleChangeRole("admin")}
                    />
                  </FormControl>
                  <FormControl>
                    <Checkbox
                      sx={{ mt: 1 }}
                      label="Acesso para gestor"
                      checked={data?.roles?.includes("gestor")}
                      onChange={(event) => handleChangeRole("gestor")}
                    />
                  </FormControl>
                </Stack>
                {data?.roles?.includes("gestor") && (
                  <GestorControl
                    areas={areas}
                    onChangeArea={handleChangeArea}
                    onRemoveArea={handleRemoveArea}
                    onAddLine={handleAddArea}
                  />
                )}
                <Stack
                  mt={4}
                  direction={"row"}
                  justifyContent={"flex-end"}
                  gap={1}
                >
                  <Button onClick={onClose} variant="outlined">
                    Cancelar
                  </Button>
                  <Button sx={{ width: 120 }} loading={loading} type="submit">
                    {editMode ? "Salvar" : "Criar"}
                  </Button>
                </Stack>
              </>
            </form>
          </DialogContent>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default ModalUser;
