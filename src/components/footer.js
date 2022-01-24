import * as React from "react";
import { LayoutContainer } from "./layoutContainer";

const Footer = () => (
  <footer className="bg-purple-500">
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
