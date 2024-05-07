import { CheckCircle } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";

function CompletedModal({ open, onClose, onFinish }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog maxWidth={"lg"} variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>
          <CheckCircle color="success" sx={{ mr: 1 }} />
          Ocorrência enviada
        </DialogTitle>
        <DialogContent sx={{ mt: 0 }}>
          Seu formulário de ocorrência foi enviado com sucesso
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="solid" color="primary" onClick={onFinish}>
            Finalizar
          </Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Fechar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default CompletedModal;
