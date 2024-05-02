import { CssVarsProvider } from "@mui/joy/styles";
import React from "react";
import "react-medium-image-zoom/dist/styles.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { HttpClient } from "./api/httpClient";
import Routes from "./routes";
import { theme } from "./theme";

function App() {
  /**
   * Configure HttpClient
   */
  HttpClient.setup();

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
    </div>
  );
}

export default App;
