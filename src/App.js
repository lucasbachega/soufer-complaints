import { CssVarsProvider } from "@mui/joy/styles";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes";
import { theme } from "./theme";

function App() {
  return (
    <div className="App">
      <CssVarsProvider theme={theme} defaultMode="light">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CssVarsProvider>
    </div>
  );
}

export default App;
