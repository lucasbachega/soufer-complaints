import { CssVarsProvider } from "@mui/joy/styles";
import "./App.css";
import { theme } from "./theme";

function App() {
  return <CssVarsProvider theme={theme} defaultMode="light"></CssVarsProvider>;
}

export default App;
