import * as React from "react";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { createPost } from "../graphql/mutations";
import { listPosts } from "../graphql/queries";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <CreatePost />
      <ListPosts />
    </Layout>
  );
};

const CreatePost = () => {
  const newPost = {
    title: "NUMBER 3",
    body: "Lorem ipsum.  This is the body.",
    url: "https://www.youtube.com/watch?v=1L2hrG-7i2Y",
  };

  async function submitPost() {
    console.log("submitting post");
    try {
      const result = await API.graphql(
        graphqlOperation(createPost, { input: newPost })
      );
      console.log({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <div>
      <h1>Create a Post</h1>
      <button type="submit" onClick={submitPost}>
        Submit a Post
      </button>
    </div>
  );
};

const ListPosts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function read() {
      const result = await API.graphql(graphqlOperation(listPosts));
      setPosts(result.data.listPosts.items);
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
