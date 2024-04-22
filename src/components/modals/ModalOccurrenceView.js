import {
    Modal,
    ModalClose,
    ModalDialog,
    ModalOverflow,
    Typography,
} from "@mui/joy";
import React from "react";

const ModalOccurrenceView = ({ open, data, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog
          minWidth={"sm"}
          maxWidth={"lg"}
          aria-labelledby="modal-dialog-overflow"
          layout={"center"}
        >
          <ModalClose />
          <Typography id="modal-dialog-overflow" level="h2">
            Overflow content {data?.id}
          </Typography>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default ModalOccurrenceView;
