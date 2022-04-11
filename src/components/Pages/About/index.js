import * as React from "react";
import { Layout } from "../../Layout";
import { Seo } from "../../Seo";

const About = () => (
  <Layout>
    <Seo title="About" />
    <h1>Hi from the second page</h1>
    <p>
      This page is not scrollable, but the footer should still be at the bottom.
    </p>
  </Layout>
);

export { About };
