import * as React from "react";
import { useMemo } from "react";
import { isMobile } from "react-device-detect";
import Amplify from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";

import awsExports from "./src/aws-exports";
import { LoginModalProvider, LoginModal } from "./src/components/LoginModal";
import {
  NavDrawer,
  NavDrawerContextProvider,
} from "./src/components/NavDrawer";
import { getTheme } from "./src/styles";
import "./src/styles/global.css";

Amplify.configure(awsExports);

// styles here
const wrapPageElement = ({ element }) => (
  <div className={`${isMobile ? "mobile-fix-100vh" : "h-screen"}`}>
    <Themer>
      <CssBaseline />
      <NavDrawer />
      <LoginModal />
      {element}
    </Themer>
  </div>
);

const Themer = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// context providers here
const wrapRootElement = ({ element }) => (
  <Authenticator.Provider>
    <NavDrawerContextProvider>
      <LoginModalProvider>
        <Authenticated>{element}</Authenticated>
      </LoginModalProvider>
    </NavDrawerContextProvider>
  </Authenticator.Provider>
);

const Authenticated = ({ children }) => {
  const { route } = useAuthenticator(context => [context.route]);

  /*
    We don't want to show the Authenticator if the user is not logged in initially 
    (so they can use they app before) logging in, 
    but we want to render if quickly if they are authenticated so we get the user info from amplify
    flow is either 
      1. idle -> setup -> sign in or
      2. idle -> setup -> authenticated

  */
  return ["idle", "setup"].includes(route) ? <Authenticator /> : children;
};

export { wrapPageElement, wrapRootElement };
