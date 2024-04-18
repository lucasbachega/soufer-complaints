import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const occurrenceCategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state) => {},
    updateCategory: (state) => {},
    removeCategory: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addCategory, removeCategory, updateCategory } =
  occurrenceCategoriesSlice.actions;

export default occurrenceCategoriesSlice.reducer;
