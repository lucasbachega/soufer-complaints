import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpClient } from "../../api/httpClient";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  `units/fetchProducts`,
  async () => {
    const res = await HttpClient.listProdutos();
    return res.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state) => {},
    updateProduct: (state) => {},
    removeProduct: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload?.map((item) => ({
          id: item?._id,
          label: item?.text,
        }));
      });
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
