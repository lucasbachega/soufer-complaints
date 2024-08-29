import { CssVarsProvider } from "@mui/joy/styles";
import "@smastrom/react-rating/style.css";
import React, { useEffect, useState } from "react";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { HttpClient } from "./api/httpClient";
import ModalErrorBase from "./components/modals/ModalErrorBase";
import SnackbarBase from "./components/snackbar/SnackbarBase";
import Routes from "./routes";
import { login } from "./store/reducers/userInfoSlice";
import { theme } from "./theme";

import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await HttpClient.testLogin();
      if (res?.ok) {
        dispatch(login(res?.user));
      }
      document.getElementById("load_application").innerHTML = "";
      setLoading(false);
    })();
  }, []);

  return (
    <div className="App">
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
