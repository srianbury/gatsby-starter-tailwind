import * as React from "react";
import { useContext } from "react";
import { LoginModalContext } from "../LoginModal";
import PropTypes from "prop-types";
import { useAuthenticator } from "@aws-amplify/ui-react";

const LoginOrUser = () => {
  const { user, route, signOut } = useAuthenticator(context => [context.route]);

  return (
    <span className="pl-2 font-bold">
      {route === "authenticated" ? (
        <HeaderLogoutButton {...{ user, signOut }} />
      ) : (
        <OpenLoginModalButton />
      )}
    </span>
  );
};

const HeaderLogoutButton = ({ user, signOut }) => (
  <button type="button" onClick={signOut} className="font-bold">
    {`${user.username}: Sign Out`}
  </button>
);

HeaderLogoutButton.propTypes = {
  user: PropTypes.object.isRequired, // user should be the CognitoUserAmplify
  signOut: PropTypes.func.isRequired,
};

const OpenLoginModalButton = () => {
  const { openModal } = useContext(LoginModalContext);

  return (
    <button onClick={openModal} type="button" className="border">
      Login
    </button>
  );
};

export { LoginOrUser };
