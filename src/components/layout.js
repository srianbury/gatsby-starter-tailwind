/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { isMobile } from "react-device-detect";
import { Header } from "./header";
import { LayoutContainer } from "./layoutContainer";
import { Footer } from "./footer";
import { darkModeTheme } from "../styles";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      className={`flex flex-col justify-between ${darkModeTheme} ${
        isMobile ? "mobile-fix-100vh" : "h-screen"
      }`}
    >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className={`mb-auto ${darkModeTheme}`}>
        <LayoutContainer>{children}</LayoutContainer>
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
