import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  action: null,
  error: false,
};

export const snackbarInitialState = initialState;

export const snackbarBaseSlice = createSlice({
  name: "snackbarBase",
  initialState,
  reducers: {
    openSnackbar: (state, { payload }) => {
      state.open = true;
      if (payload) {
        if (payload.message) state.message = payload.message;
        if (payload.action) state.action = payload.action;
        state.error = Boolean(payload.error);
      }
    },
    clearSnackbar(state) {
      state.message = initialState.message;
      state.action = initialState.action;
      state.error = initialState.error;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar, clearSnackbar } = snackbarBaseSlice.actions;

export default snackbarBaseSlice.reducer;
