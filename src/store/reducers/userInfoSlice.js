import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  data: {
    roles: [],
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.isLogged = true;
      state.data = payload;
    },
    logout(state) {
      state.isLogged = false;
      state.data = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userInfoSlice.actions;

export const selectUserIsAdmin = (state) =>
  state?.userInfo?.data?.roles?.includes("admin");
export const selectUserIsGestor = (state) =>
  state?.userInfo?.data?.roles?.includes("gestor");
export const selectUserTransportRoles = (state) =>
  state?.userInfo?.data?.transportRoles || [];

export default userInfoSlice.reducer;
