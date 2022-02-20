import * as React from "react";
import { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@mui/material";
import { createPost } from "../../../graphql/mutations";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";

const CreatePostPage = () => {
  const { user } = useAuthenticator(context => [context.user]);
  const [state, setState] = useState({
    title: "",
    body: "",
    source: "",
  });

  function handleInputChange(event) {
    setState(cur => ({
      ...cur,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting post");
    try {
      // const result = await API.graphql(graphqlOperation(createPost, { input: state }));
      const result = await API.graphql({
        query: createPost,
        variables: { input: state },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      console.log({ result });
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <Layout>
      <Seo title="Post - Create" />
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            name="title"
            className="text-black"
            value={state.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Body:
          <input
            name="body"
            className="text-black"
            value={state.body}
            onChange={handleInputChange}
          />
        </div>
        <div>
          Source:
          <input
            name="source"
            className="text-black"
            value={state.source}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default CreatePostPage;
