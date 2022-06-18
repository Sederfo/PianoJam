import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import Register from "pages/Register";
import Login from "pages/Login";
import "assets/styles/index.css";
import PlayingPage from "pages/PlayingPage";
import HomePage from "pages/HomePage";


const theme = createTheme({
  palette: {
    primary: {
      main: "#EDE0D4",
    },
    secondary: {
      main: "#06070E",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  return (
    <Router>
        <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/room:roomId" element={<PlayingPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
        </ThemeProvider>
    </Router>
  );
}

export default App;
