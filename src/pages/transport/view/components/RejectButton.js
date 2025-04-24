import {
  Box,
  Button,
  Dropdown,
  Menu,
  MenuButton,
  ModalClose,
  Textarea,
  Typography,
} from "@mui/joy";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../../api/httpClient";
import { setError } from "../../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../../store/reducers/snackbarBaseSlice";

const RejectButton = ({
  transportId,
  onClose = () => {},
  onRefresh = () => {},
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    const res = await HttpClient.transports.reject(transportId, reason);
    if (res?.ok) {
      setOpen(false)
      onRefresh();
      onClose();
      dispatch(openSnackbar({ message: "Transporte rejeitado" }));
    } else {
      dispatch(setError({ message: res?.error?.message || "" }));
    }
    setLoading(false);
  };

  return (
    <Dropdown open={open} onOpenChange={(e, v) => setOpen(v)}>
      <MenuButton color="danger" variant="soft">
        Rejeitar
      </MenuButton>
      <Menu sx={{ zIndex: (t) => t.zIndex.modal + 100 }}>
        <ModalClose
          slotProps={{
            root: {
              onClick: () => setOpen(false),
            },
          }}
        />
        <Box maxWidth={400} p={2}>
          <Typography level="h4">Rejeitar</Typography>
          <Typography mb={1.5} mt={0.5} color="neutral" level="body-sm">
            O solicitante será informado de que a solicitação não será atendida.
          </Typography>
          <Textarea
            placeholder="Informe um motivo"
            minRows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Stack mt={2} direction={"row"} gap={1}>
            <Box flex={1} />
            <Button
              onClick={() => setOpen(false)}
              color="neutral"
              variant="soft"
              size="sm"
            >
              Cancelar
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              color="danger"
              variant="solid"
              size="sm"
              onClick={handleConfirm}
            >
              Rejeitar
            </Button>
          </Stack>
        </Box>
      </Menu>
    </Dropdown>
  );
};

export default RejectButton;
