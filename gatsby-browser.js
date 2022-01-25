/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import * as React from "react";
import { isMobile } from "react-device-detect";
import {
  NavDrawer,
  NavDrawerContextProvider,
} from "./src/components/navDrawer";
import "./src/styles/global.css";

const wrapPageElement = ({ element }) => {
  return (
    <div className={isMobile ? "mobile-fix-100vh" : "h-screen"}>
      <NavDrawerContextProvider>
        <>
          <NavDrawer />
          {element}
        </>
      </NavDrawerContextProvider>
    </div>
  );
};

export { wrapPageElement };
