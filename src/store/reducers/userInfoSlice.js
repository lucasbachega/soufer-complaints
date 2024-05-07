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
  },
});

// Action creators are generated for each case reducer function
export const { login } = userInfoSlice.actions;

export default userInfoSlice.reducer;
