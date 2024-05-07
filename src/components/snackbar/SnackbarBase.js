import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/joy";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSnackbar,
  closeSnackbar,
} from "../../store/reducers/snackbarBaseSlice";

function SnackbarBase(props) {
  const dispatch = useDispatch();

  const { open, message, action, error } = useSelector(
    (state) => state.snackbarBase
  );

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={3000}
      onClose={handleClose}
      color={error ? "danger" : "neutral"}
      endDecorator={
        <>
          {action && action}
          <IconButton onClick={handleClose} color="neutral">
            <Close />
          </IconButton>
        </>
      }
    >
      {message}
    </Snackbar>
  );
}

export default memo(SnackbarBase);
