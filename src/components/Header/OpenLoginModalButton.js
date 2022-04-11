import * as React from "react";
import { useContext } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@mui/material";
import { isMobile } from "react-device-detect";
import { LoginModalContext } from "../LoginModal";
import { navigate } from "gatsby-link";
import { NavDrawerContext } from "../NavDrawer";

const OpenLoginModalButton = () => {
  const { route } = useAuthenticator(context => [context.route]);
  const { openModal } = useContext(LoginModalContext);
  const { closeDrawer } = useContext(NavDrawerContext);

  function goToLogInPage() {
    navigate("/login");
    closeDrawer();
  }

  function handleClick() {
    isMobile ? goToLogInPage() : openModal();
  }

  return route === "authenticated" ? null : (
    <Button onClick={handleClick} variant="outlined">
      Log In
    </Button>
  );
};
OpenLoginModalButton.propTypes = {};

export { OpenLoginModalButton };
