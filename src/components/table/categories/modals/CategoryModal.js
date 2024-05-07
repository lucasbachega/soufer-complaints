import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useEffect, useState } from "react";
import TextArea from "../../../inputs/TextInputArea";

function CategoryModal({
  open,
  onClose,
  categoryId,
  defaultText,
  editMode,
  onConfirm = async () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultText || "");

  const handleConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onConfirm(value, categoryId);
    setLoading(false);
    onClose();
  };

  useEffect(() => setValue(defaultText || ""), [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog minWidth={350}>
        <ModalClose />
        <DialogTitle>
          {editMode ? "Editar categoria" : "Criar nova categoria"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <form onSubmit={handleConfirm}>
          <Stack spacing={4}>
            <TextArea
              value={value}
              onChange={setValue}
              autoFocus
              label={"Nome"}
              required
              disabled={loading}
              minRows={1}
            />
            <Button loading={loading} type="submit">
              {editMode ? "Salvar" : "Criar"}
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}

export default CategoryModal;
