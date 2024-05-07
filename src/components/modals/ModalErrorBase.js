import { WarningOutlined } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeError } from "../../store/reducers/errorBaseSlice";

function ModalErrorBase(props) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.errorBase.open);

  const errorBase = useSelector((state) => state.errorBase);
  const { title, message } = errorBase;

  return (
    <Modal open={open} onClose={() => dispatch(closeError())}>
      <ModalDialog minWidth={400} variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>
          <WarningOutlined sx={{ mr: 1 }} />
          {title}
        </DialogTitle>
        <Divider />
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => dispatch(closeError())}
          >
            Fechar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}

export default ModalErrorBase;
