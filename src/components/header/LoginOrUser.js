import * as React from "react";
import PropTypes from "prop-types";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link } from "gatsby";

const LoginOrUser = () => {
  const { user, route, signOut } = useAuthenticator(context => [
    context.user,
    context.route,
  ]);

  console.log({ user, route });

  return (
    <span className="pl-2 font-bold">
      {user ? (
        <HeaderLogoutButton {...{ user, signOut }} />
      ) : (
        <Link to="/login">Login</Link>
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

export { LoginOrUser };
