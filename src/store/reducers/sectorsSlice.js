import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const sectorsSlice = createSlice({
  name: "sectors",
  initialState,
  reducers: {
    addSector: (state) => {},
    updateSector: (state) => {},
    removeSector: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addSector, removeSector, updateSector } = sectorsSlice.actions;

export default sectorsSlice.reducer;
