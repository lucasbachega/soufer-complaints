import { configureStore } from "@reduxjs/toolkit";
import unitsSlice from "./reducers/unitsSlice";
import sectorsSlice from "./reducers/sectorsSlice";
import productsSlice from "./reducers/productsSlice";
import occurrenceCategoriesSlice from "./reducers/occurrenceCategoriesSlice";
import userInfoSlice from "./reducers/userInfoSlice";
import errorBaseSlice from "./reducers/errorBaseSlice";
import snackbarBaseSlice from "./reducers/snackbarBaseSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice,
    units: unitsSlice,
    sectors: sectorsSlice,
    products: productsSlice,
    categories: occurrenceCategoriesSlice,

    errorBase: errorBaseSlice,
    snackbarBase: snackbarBaseSlice,
  },
});
