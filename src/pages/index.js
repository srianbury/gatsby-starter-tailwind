import * as React from "react";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
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

const ListPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function read() {
      try {
        const result = await API.graphql(graphqlOperation(listPosts));
        setPosts(result.data.listPosts.items);
      } catch (e) {
        setPosts([]);
        console.log("listPosts", { e });
      }
    }
    read();
  }, []);

  if (posts === null) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts.</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="border-rounded mb-2 border p-2">
          <div>{post.body}</div>
          <div>{post.createdAt}</div>
          <div>{post.id}</div>
          {/* <div>{post.owner}</div> */}
          <div>{post.title}</div>
          <div>{post.updatedAt}</div>
          <div>{post.url}</div>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
