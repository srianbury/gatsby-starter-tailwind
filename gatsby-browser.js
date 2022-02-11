import * as React from "react";
import { isMobile } from "react-device-detect";
import Amplify from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "./src/aws-exports";
import {
  NavDrawer,
  NavDrawerContextProvider,
} from "./src/components/navDrawer";
import "./src/styles/global.css";

Amplify.configure(awsExports);

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

const wrapRootElement = ({ element }) => (
  <Authenticator.Provider>{element}</Authenticator.Provider>
);

export { wrapPageElement, wrapRootElement };
