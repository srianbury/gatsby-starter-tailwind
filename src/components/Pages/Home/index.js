import * as React from "react";
import { Layout } from "../../Layout";
import { Seo } from "../../Seo";
import { ListPosts } from "../../ListPosts";

const Home = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <ListPosts />
    </Layout>
  );
};

export { Home };
