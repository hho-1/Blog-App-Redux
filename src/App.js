import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import store from "./store/Store";
import { Provider, useSelector } from "react-redux";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { useMemo, useState } from "react";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#fbbf24",
            backgroundMain: "#fffbeb",
            backgroundSecondary: "#fde68a",
            textMain: "#000",
            textSecondary: "#240750",
            textProfile: "#4C3BCF",
            categoryBackground: "#F2F1EF",
            addComment: "#F3F7EC",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#dbf4ff",
            backgroundMain: "#240750",
            backgroundSecondary: "#004282",
            textMain: "#fff",
            textSecondary: "#F3F7EC",
            textProfile: "#FFF5E1",
            categoryBackground: "#004282",
            addComment: "#7E8EF1",
          },
        }),
  },
});

function App() {
  /* const theme = createTheme({
    palette: {
      primary: {
        main: '#ffcd44',
        light: '#e2e55e',
        blu: '#0068e3',
        sky: '#57c1ff',
        dark: '#002499'
      },
      secondary:{
        main: '#00395c',
        light: '#364b7e',
        purp: '#7964aa',
        lil: '#d483d9',
        pink: '#ffacff'
      }
    },
  }); */

  const [mode, setMode] = useState("light");
  const darkMode = useSelector((state) => state.theme.darkMode);

  useMemo(() => {
    if (darkMode) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [darkMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />

        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
