import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpClient } from "../../api/httpClient";

const initialState = {
  data: [],
  status: "idle",
};

export const fetchUnits = createAsyncThunk(`units/fetchUnits`, async () => {
  const res = await HttpClient.listUnidades();
  return res.data;
});

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    addUnit: (state, { payload }) => {
      state.data.push(payload);
    },
    updateUnit: (state) => {},
    removeUnit: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnits.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUnits.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload?.map((item) => ({
          id: item?._id,
          label: item?.text,
        }));
      });
  },
});

// Action creators are generated for each case reducer function
export const { addUnit, removeUnit, updateUnit } = unitsSlice.actions;

export default unitsSlice.reducer;
