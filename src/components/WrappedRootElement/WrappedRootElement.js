import * as React from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { NavDrawerContextProvider } from "../NavDrawer";
import { LoginModalProvider } from "../LoginModal";

const WrappedRootElement = ({ element }) => (
  <Authenticator.Provider>
    <NavDrawerContextProvider>
      <LoginModalProvider>
        <Authenticated>{element}</Authenticated>
      </LoginModalProvider>
    </NavDrawerContextProvider>
  </Authenticator.Provider>
);

const Authenticated = ({ children }) => {
  /*
      We don't want to show the Authenticator if the user is not logged in initially 
      (so they can use they app before) logging in, 
      but we want to render if quickly if they are authenticated so we get the user info from amplify
      flow is either 
        1. idle -> setup -> sign in or
        2. idle -> setup -> authenticated
  */
  const { route } = useAuthenticator(context => [context.route]);
  return ["idle", "setup"].includes(route) ? <Authenticator /> : children;
};

export { WrappedRootElement };
