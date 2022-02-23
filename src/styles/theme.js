import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function getTheme(prefersDarkMode) {
  return lightTheme; // prefersDarkMode ? darkTheme : lightTheme; TODO Override the styles for the RichTextEditor before allowing darkMode
}

export { getTheme };
