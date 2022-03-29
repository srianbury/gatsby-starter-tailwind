import * as React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@mui/material";

const HeaderLogoutButton = () => {
  const { route, user, signOut } = useAuthenticator(context => [
    context.route,
    context.user,
  ]);

  return route === "authenticated" ? (
    <Button
      onClick={signOut}
      variant="outlined"
    >{`${user.username}: Log Out`}</Button>
  ) : null;
};
HeaderLogoutButton.propTypes = {};

export { HeaderLogoutButton };
