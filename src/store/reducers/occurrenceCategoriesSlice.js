import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpClient } from "../../api/httpClient";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchCategories = createAsyncThunk(
  `units/fetchCategories`,
  async () => {
    const res = await HttpClient.listCategorias();
    return res.data;
  }
);

export const occurrenceCategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state) => {},
    updateCategory: (state) => {},
    removeCategory: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload?.map((item) => ({
          id: item?._id,
          label: item?.text,
        }));
      });
  },
});

// Action creators are generated for each case reducer function
export const { addCategory, removeCategory, updateCategory } =
  occurrenceCategoriesSlice.actions;

export default occurrenceCategoriesSlice.reducer;
