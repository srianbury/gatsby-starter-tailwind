import * as React from "react";
import { LayoutContainer } from "./layoutContainer";
import { darkModeTheme } from "../styles";

const Footer = () => (
  <footer
    className={`${darkModeTheme} border-t-2 border-black dark:border-white`}
  >
    <LayoutContainer>
      <>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </>
    </LayoutContainer>
  </footer>
);

export { Footer };
