import { configureStore } from "@reduxjs/toolkit";
import unitsSlice from "./reducers/unitsSlice";
import sectorsSlice from "./reducers/sectorsSlice";
import productsSlice from "./reducers/productsSlice";
import occurrenceCategoriesSlice from "./reducers/occurrenceCategoriesSlice";

export const store = configureStore({
  reducer: {
    units: unitsSlice,
    sectors: sectorsSlice,
    products: productsSlice,
    categories: occurrenceCategoriesSlice,
  },
});
