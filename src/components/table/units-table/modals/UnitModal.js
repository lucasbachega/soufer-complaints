import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import TextInput from "../../../inputs/TextInput";

function UnitModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog minWidth={350}>
        <ModalClose />
        <DialogTitle>Criar nova unidade</DialogTitle>
        <DialogContent></DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <Stack spacing={4}>
            <TextInput autoFocus label={"Nome"} required />
            <Button type="submit">Criar</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default UnitModal;
