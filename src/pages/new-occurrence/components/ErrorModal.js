import { CheckCircle, InfoRounded } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";

function ErrorModal({ open, onClose, error, onRetry }) {
  return (
    open && (
      <Modal open={open} onClose={onClose}>
        <ModalDialog minWidth={400} variant="outlined" role="alertdialog">
          <ModalClose />
          <DialogTitle>
            <InfoRounded color="error" sx={{ mr: 1 }} />
            Erro ao enviar ocorrência
          </DialogTitle>
          <DialogContent sx={{ mt: 0 }}>{error}</DialogContent>
          <DialogActions>
            <Button variant="outlined" color="neutral" onClick={onRetry}>
              Tentar novamente
            </Button>
            <Button autoFocus variant="plain" color="neutral" onClick={onClose}>
              Fechar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    )
  );
}

export default ErrorModal;
