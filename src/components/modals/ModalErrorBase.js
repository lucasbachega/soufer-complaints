import { WarningOutlined } from "@mui/icons-material";
import {
  Box,
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
  const { title, message, error } = errorBase;

  return (
    <Modal
      open={open}
      onClose={() => dispatch(closeError())}
      sx={{ zIndex: (t) => t.zIndex.modal + 1000 }}
    >
      <ModalDialog minWidth={400} variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>
          <WarningOutlined sx={{ mr: 1 }} />
          {title || "Algo deu errado"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            component={"div"}
            fontSize={".95rem"}
            fontWeight={"md"}
            sx={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{
              __html:
                error?.response?.data?.message?.toString() ||
                error?.response?.data?.toString() ||
                message ||
                "",
            }}
          />
        </DialogContent>
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
