import { Close, Warning } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../../api/httpClient";
import { setError as setErrorStore } from "../../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../../store/reducers/snackbarBaseSlice";
import PasswordInput from "../../../inputs/PasswordInput";
import DetailItem from "../../../modals/occurrence-view/components/DetailItem";

const ChangePassword = ({
  open,
  onClose,
  username,
  firstname,
  email,
  userId,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setError(null);
    }
  }, [open]);

  const handleConfirm = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Senhas não correspondem");
      return;
    }

    setLoading(true);
    const res = await HttpClient.admin.updateUser(userId, { password });
    if (res.ok) {
      dispatch(openSnackbar({ message: "Senha alterada com sucesso" }));
    } else {
      dispatch(
        setErrorStore({
          title: "Erro ao redefinir senha",
          message: res?.error?.message,
        })
      );
    }
    setLoading(false);
    onClose();
  };

  return (
    <Modal onClick={(e) => e.stopPropagation()} open={open} onClose={onClose}>
      <ModalDialog onClick={(e) => e.stopPropagation()} minWidth={400}>
        <ModalClose />
        <DialogTitle>Redefinir senha</DialogTitle>
        <DialogContent>
          <Box
            mt={2}
            border={1}
            borderColor={"divider"}
            borderRadius={"sm"}
            p={1}
            px={2}
          >
            <DetailItem label={"Nome"} value={firstname} />
            <DetailItem label={"E-mail"} value={email} />
            <DetailItem label={"Usuário"} value={username} />
          </Box>

          {Boolean(error) && (
            <Alert
              sx={{ mt: 2 }}
              startDecorator={<Warning />}
              variant="soft"
              color="danger"
              endDecorator={
                <React.Fragment>
                  <IconButton
                    onClick={() => setError(null)}
                    variant="soft"
                    size="sm"
                    color="danger"
                  >
                    <Close />
                  </IconButton>
                </React.Fragment>
              }
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleConfirm}>
            <Stack mt={2} gap={2}>
              <PasswordInput value={password} onChange={setPassword} />
              <PasswordInput
                label="Confirmar senha"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
              <Button sx={{ mt: 4 }} loading={loading} type="submit">
                Redefinir
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default ChangePassword;
