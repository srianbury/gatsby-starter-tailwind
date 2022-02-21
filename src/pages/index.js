import * as React from "react";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { listPosts } from "../graphql/queries";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <ListPosts />
    </Layout>
  );
};

const INIT_POST_STATE = {
  data: null,
  error: null,
};
const ListPosts = () => {
  const { user } = useAuthenticator(context => [context.user]);
  const [posts, setPosts] = useState(INIT_POST_STATE);

  useEffect(() => {
    async function read() {
      try {
        setPosts(INIT_POST_STATE);
        const result = await API.graphql({
          query: listPosts,
          variables: {},
          authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });
        setPosts(cur => ({
          ...cur,
          data: result.data.listPosts.items,
        }));
        console.log({ result });
      } catch (e) {
        setPosts(cur => ({
          ...cur,
          error: "An unexpecte error occurred",
        }));
        console.log("listPosts", { e });
      }
    }
    read();
  }, []);

  if (posts.data === null) {
    return <div>Loading...</div>;
  }

  if (posts.error !== null) {
    return <div>{posts.error}</div>;
  }

  if (posts.data.length === 0) {
    return <div>No posts.</div>;
  }

  return (
    <div>
      {posts.data.map(post => (
        <div key={post.id} className="border-rounded mb-2 border p-2">
          <h2>{post.title}</h2>
          <div>{post.body}</div>
          <div>{`Source: ${post.source}`}</div>
          <div>{`Created at: ${post.createdAt}`}</div>
          <div>{post.owner}</div>
          <div>{post.id}</div>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
