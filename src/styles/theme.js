import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff0000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0000ff",
    },
  },
});

function getTheme(prefersDarkMode) {
  return prefersDarkMode ? darkTheme : lightTheme;
}

export { getTheme };
