import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    addUnit: (state) => {},
    updateUnit: (state) => {},
    removeUnit: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addUnit, removeUnit, updateUnit } = unitsSlice.actions;

export default unitsSlice.reducer;
