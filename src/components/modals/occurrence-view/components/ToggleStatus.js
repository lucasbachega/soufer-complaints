import { EditOutlined } from "@mui/icons-material";
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { occurrenceStatus } from "../../../../utils/occurrences";
import { HttpClient } from "../../../../api/httpClient";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../store/reducers/snackbarBaseSlice";
import { setError } from "../../../../store/reducers/errorBaseSlice";

function ToggleStatus({
  initialStatus = "",
  occurrenceId,
  onUpdate = () => {},
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleSave = async () => {
    setLoading(true);
    const res = await HttpClient.admin.updateOcorrencia(occurrenceId, {
      status,
    });
    if (res?.ok) {
      onUpdate(status);
      dispatch(
        openSnackbar({
          message: "Status alterado",
        })
      );
    } else {
      setStatus(initialStatus);
      dispatch(
        setError({
          title: "Erro ao alterar status",
          message: res?.error,
        })
      );
    }
    setOpen(false);
    setLoading(false);
  };

  return (
    <>
      <Chip
        variant={status === "completed" ? "soft" : "outlined"}
        color={occurrenceStatus[status]?.color}
        sx={{ position: "absolute", right: 50, top: 12 }}
        startDecorator={<EditOutlined />}
        onClick={() => setOpen(true)}
      >
        {occurrenceStatus[status]?.text}
      </Chip>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setStatus(initialStatus);
        }}
      >
        <ModalDialog minWidth={400}>
          <ModalClose />
          <DialogTitle>Status da ocorrência</DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <FormControl disabled={loading}>
              <RadioGroup
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <Radio value="open" label="Em aberto" color="neutral" />
                <Radio value="completed" label="Concluído" color="success" />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSave}
              variant="solid"
              loading={loading}
              disabled={loading}
            >
              Salvar
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false);
                setStatus(initialStatus);
              }}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default ToggleStatus;
