import { CssVarsProvider } from "@mui/joy/styles";
import React, { useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { HttpClient } from "./api/httpClient";
import Routes from "./routes";
import { theme } from "./theme";
import { useDispatch } from "react-redux";
import { fetchUnits } from "./store/reducers/unitsSlice";
import { fetchSectors } from "./store/reducers/sectorsSlice";
import { fetchProducts } from "./store/reducers/productsSlice";
import { fetchCategories } from "./store/reducers/occurrenceCategoriesSlice";
import SnackbarBase from "./components/snackbar/SnackbarBase";
import ModalErrorBase from "./components/modals/ModalErrorBase";

function App() {
  const dispatch = useDispatch();

  // Configure HttpClient
  HttpClient.setup();

  useEffect(() => {
    dispatch(fetchUnits());
    dispatch(fetchSectors());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="App">
      <CssVarsProvider
        theme={theme}
        defaultMode="light" // the selector to apply the CSS theme variables stylesheet.
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CssVarsProvider>
      <SnackbarBase />
      <ModalErrorBase />
    </div>
  );
}

export default App;
