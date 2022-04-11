import * as React from "react";
import { Layout } from "../../Layout";
import { Seo } from "../../Seo";
import { ListPosts } from "../../ListPosts";
import { QUERY_PARAMS } from "../../../constants";

const Search = ({ location }) => {
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get(QUERY_PARAMS.QUERY);

  return (
    <Layout>
      <Seo title="Search" />
      <ListPosts searchQuery={searchQuery} />
    </Layout>
  );
};

export { Search };
