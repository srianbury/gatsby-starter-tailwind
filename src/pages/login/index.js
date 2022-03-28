import * as React from "react";
import { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { navigate } from "gatsby";

import { Layout } from "../../components/Layout";
import { Seo } from "../../components/Seo";
import "@aws-amplify/ui-react/styles.css";

const Login = () => {
  const { route } = useAuthenticator(context => [context.route]);

  // close the modal after the user logs in
  useEffect(() => {
    if (route === "authenticated") {
      navigate("/");
    }
  }, [route]);

  return (
    <Layout>
      <Seo title="Login" />
      <Authenticator />
    </Layout>
  );
};

export default Login;
