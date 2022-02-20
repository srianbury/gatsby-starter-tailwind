import * as React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createPost } from "../../../graphql/mutations";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";

const CreatePostPage = () => {
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
    <Layout>
      <Seo title="Post - Create" />
      <h1>Create a Post</h1>
      <div>
        <button type="submit" onClick={submitPost}>
          Submit
        </button>
      </div>
    </Layout>
  );
};

export default CreatePostPage;
