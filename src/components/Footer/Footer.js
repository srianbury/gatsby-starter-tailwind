import * as React from "react";
import { Box } from "@mui/material";
import { LayoutContainer } from "../LayoutContainer";
import { HeaderLink } from "../Header";
import { navigation } from "../../constants";

const Footer = () => (
  <footer>
    <Box sx={{ borderTop: 1 }}>
      <LayoutContainer>
        <span className="pl-2">
          <HeaderLink to={navigation.ABOUT_TO} title={navigation.ABOUT_TITLE} />
        </span>
      </LayoutContainer>
    </Box>
  </footer>
);

export { Footer };
