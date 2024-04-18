import { CssVarsProvider } from "@mui/joy/styles";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes";
import { theme } from "./theme";
import 'react-medium-image-zoom/dist/styles.css'

function App() {
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
