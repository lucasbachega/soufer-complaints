import { createSlice } from "@reduxjs/toolkit";
import React from "react";

const initialState = {
  open: false,
  title: "Erro",
  message: "",
  error: {},
  config: {
    url: "",
    method: "",
    data: {},
  },
  content: <></>,
};
export const errorInitialState = initialState;
export const errorBaseSlice = createSlice({
  name: "errorBase",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.open = true;
      if (payload) {
        if (payload.title) state.title = payload.title;
        if (payload.message) state.message = payload.message;
        if (payload.error) state.error = payload.error;
        if (payload.content) state.content = payload.content;
        if (payload.config) state.config = payload.config;
        if (payload.error) state.error = payload.error;
      }
    },
    closeError: (state) => {
      state.open = false;
      state.content = initialState.content;
      state.details = initialState.details;
      state.title = initialState.title;
      state.config = initialState.config;
      state.message = initialState.message;
    },
  },
});

export const { setError, closeError } = errorBaseSlice.actions;

export default errorBaseSlice.reducer;
