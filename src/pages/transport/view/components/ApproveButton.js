import {
    Box,
    Button,
    Dropdown,
    Menu,
    MenuButton,
    ModalClose,
    Typography,
} from "@mui/joy";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../../api/httpClient";
import { setError } from "../../../../store/reducers/errorBaseSlice";
import { openSnackbar } from "../../../../store/reducers/snackbarBaseSlice";

const ApproveButton = ({
  transportId,
  onClose = () => {},
  onRefresh = () => {},
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const res = await HttpClient.transports.approve(transportId);
    if (res?.ok) {
      setOpen(false);
      onRefresh();
      onClose();
      dispatch(openSnackbar({ message: "Transporte aprovado" }));
    } else {
      dispatch(setError({ message: res?.error?.message || "" }));
    }
    setLoading(false);
  };

  return (
    <Dropdown open={open} onOpenChange={(e, v) => setOpen(v)}>
      <MenuButton color="primary" variant="soft">
        Aprovar
      </MenuButton>
      <Menu sx={{ zIndex: (t) => t.zIndex.modal + 100 }}>
        <ModalClose
          slotProps={{
            root: {
              onClick: () => setOpen(false),
            },
          }}
        />
        <Box maxWidth={300} p={2}>
          <Typography level="h4">
            Tem certeza que deseja aprovar o transporte?
          </Typography>
          <Typography mt={0.5} color="neutral" level="body-sm">
            Ao aprovar, a solicitação será enviada para a transportadora
            confirmar.
          </Typography>
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
              color="primary"
              variant="solid"
              size="sm"
              onClick={handleConfirm}
            >
              Aprovar
            </Button>
          </Stack>
        </Box>
      </Menu>
    </Dropdown>
  );
};

export default ApproveButton;
