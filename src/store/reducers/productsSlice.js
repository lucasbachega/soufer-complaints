import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {},
    updateProduct: (state) => {},
    removeProduct: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
