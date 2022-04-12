/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { LayoutContainer } from "../LayoutContainer";
import { PageErrorBoundry } from "../ErrorBoundary";

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
      className={`flex flex-col justify-between ${
        isMobile ? "mobile-fix-100vh" : "h-screen"
      }`}
    >
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className="mb-auto">
        <LayoutContainer>
          <PageErrorBoundry>{children} </PageErrorBoundry>
        </LayoutContainer>
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
