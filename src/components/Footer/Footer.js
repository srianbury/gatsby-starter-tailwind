import * as React from "react";
import { Box } from "@mui/material";
import { LayoutContainer } from "../LayoutContainer";

const Footer = () => (
  <footer>
    <Box sx={{ borderTop: 1 }}>
      <LayoutContainer>
        <>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </>
      </LayoutContainer>
    </Box>
  </footer>
);

export { Footer };
