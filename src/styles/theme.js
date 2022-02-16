import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "black",
          border: "2px solid black",
          "&:hover": {
            background: "transparent",
          },
        },
      },
    },
  },
});

export { theme };
