import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import "@aws-amplify/ui-react/styles.css";

const Login = () => (
  <Layout>
    <Seo title="About" />
    <Authenticator />
  </Layout>
);

export default Login;
