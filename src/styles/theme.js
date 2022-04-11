import { createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    secondary: blueGrey,
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
