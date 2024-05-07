import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpClient } from "../../api/httpClient";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchSectors = createAsyncThunk(`units/fetchSectors`, async () => {
  const res = await HttpClient.listSetores();
  return res.data;
});

export const sectorsSlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {
    addSector: (state, { payload }) => {
      state.data.push(payload);
    },
    updateSector: (state) => {},
    removeSector: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSectors.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSectors.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload?.map((item) => ({
          id: item?._id,
          label: item?.text,
        }));
      });
  },
});

export const { addSector, removeSector, updateSector } = sectorsSlice.actions;

export default sectorsSlice.reducer;
