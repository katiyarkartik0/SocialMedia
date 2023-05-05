import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import NavBar from "./componentss/homePage/NavBar";
import { HomePage } from "./componentss/homePage/Homepage";
import LoginPage from "./componentss/loginPage/LoginPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const token = useSelector((state) => state.token);
  const isAuthenticated = Boolean(token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/home"
              element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
            ></Route>
            <Route path="/profile/:userId" element={<></>}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
