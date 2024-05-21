import {
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControl,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import PasswordInput from "../../../inputs/PasswordInput";
import TextInput from "../../../inputs/TextInput";

const CreateUserModal = ({
  open,
  onClose,
  onConfirm,
  editMode,
  initialData,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    initialData || {
      firstname: "",
      username: "",
      password: "",
      roles: [],
    }
  );

  useEffect(() => {
    if (!open) {
      setData(
        initialData || {
          firstname: "",
          username: "",
          password: "",
          roles: [],
        }
      );
    }
  }, [open]);

  const handleChangeValue = useCallback((prop, value) => {
    setData((prev) => ({ ...prev, [prop]: value }));
  }, []);

  const handleConfirm = async (event) => {
    event.preventDefault();
    let formatedData = { ...data };
    if (editMode) {
      delete formatedData.password;
    }
    setLoading(true);
    await onConfirm(formatedData);
    setLoading(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog minWidth={350}>
        <ModalClose />
        <DialogTitle>
          {editMode ? "Editar usuário" : "Criar usuário"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleConfirm}>
            <Stack mt={2} gap={2}>
              <TextInput
                required
                label={"Nome"}
                autoFocus
                value={data?.firstname}
                onChange={(value) => handleChangeValue("firstname", value)}
              />
              <TextInput
                required
                label={"Usuário de acesso"}
                value={data?.username}
                onChange={(value) => handleChangeValue("username", value)}
              />
              {!editMode && (
                <PasswordInput
                  value={data?.password}
                  onChange={(value) => handleChangeValue("password", value)}
                />
              )}
              <FormControl>
                <Checkbox
                  sx={{ mt: 1 }}
                  label="Acesso para administrador"
                  checked={data?.roles?.includes("admin")}
                  onChange={(event) =>
                    data?.roles?.includes("admin")
                      ? handleChangeValue("roles", [])
                      : handleChangeValue("roles", ["admin"])
                  }
                />
              </FormControl>
              <Button sx={{ mt: 4 }} loading={loading} type="submit">
                {editMode ? "Salvar" : "Criar"}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default CreateUserModal;
