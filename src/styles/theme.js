import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function getTheme(prefersDarkMode) {
  return prefersDarkMode ? darkTheme : lightTheme;
}

export { getTheme };
