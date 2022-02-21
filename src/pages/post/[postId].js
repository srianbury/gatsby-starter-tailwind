import * as React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const SinglePostPage = ({ params }) => {
  const postId = params[`postId`];
  return (
    <Layout>
      <Seo title={`Post ${postId}`} />
      <h1>View Post {postId}</h1>
    </Layout>
  );
};

export default SinglePostPage;
