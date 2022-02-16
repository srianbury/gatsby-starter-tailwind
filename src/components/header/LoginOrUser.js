import * as React from "react";
import { useContext } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@mui/material";
import { LoginModalContext } from "../LoginModal";

const LoginOrUser = () => {
  const { route } = useAuthenticator(context => [context.route]);

  return route === "authenticated" ? (
    <HeaderLogoutButton />
  ) : (
    <OpenLoginModalButton />
  );
};
LoginOrUser.propTypes = {};

const HeaderLogoutButton = () => {
  const { user, signOut } = useAuthenticator(context => [context.route]);
  return (
    <Button onClick={signOut} className="dark:border-white dark:text-white">
      <span className="font-bold">{`${user.username}: Log Out`}</span>
    </Button>
  );
};
HeaderLogoutButton.propTypes = {};

const OpenLoginModalButton = () => {
  const { openModal } = useContext(LoginModalContext);

  return (
    <Button onClick={openModal} className="dark:border-white dark:text-white">
      <span className="font-bold">Log In</span>
    </Button>
  );
};
OpenLoginModalButton.propTypes = {};

export { LoginOrUser, HeaderLogoutButton, OpenLoginModalButton };
