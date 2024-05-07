import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  data: {},
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

export default userInfoSlice.reducer;
