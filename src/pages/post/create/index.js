import * as React from "react";
import { useState } from "react";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, TextField } from "@mui/material";
import { createPost } from "../../../graphql/mutations";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";

const INIT_POST_STATE = {
  error: null,
  success: false,
  data: {
    title: "",
    body: "",
    source: "",
  },
};
const CreatePostPage = () => {
  const { user } = useAuthenticator(context => [context.user]);
  const [state, setState] = useState(INIT_POST_STATE);

  function handleInputChange(event) {
    setState(cur => ({
      ...cur,
      data: {
        ...cur.data,
        [event.target.name]: event.target.value,
      },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submitting post");
    try {
      setState(cur => ({
        ...cur,
        error: INIT_POST_STATE.error,
        success: INIT_POST_STATE.success,
      }));
      // const result = await API.graphql(graphqlOperation(createPost, { input: state }));
      const result = await API.graphql({
        query: createPost,
        variables: { input: state.data },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      setState({
        ...INIT_POST_STATE,
        success: true,
      });
      console.log({ result });
    } catch (e) {
      setState(cur => ({
        ...cur,
        error: "An unexpected error occurred.",
      }));
      console.log({ e });
    }
  }

  return (
    <Layout>
      <Seo title="Post - Create" />
      <h1 className="mb-2">Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          autoComplete="off"
          className="mb-2"
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          value={state.data.title}
          onChange={handleInputChange}
          sx={{
            width: "100%",
            maxWidth: "sm",
            display: "block",
          }}
        />
        <TextField
          required
          fullWidth
          autoComplete="off"
          className="mb-2"
          id="body"
          name="body"
          label="Description"
          variant="outlined"
          value={state.data.body}
          onChange={handleInputChange}
          sx={{
            maxWidth: "sm",
            display: "block",
          }}
        />
        <TextField
          fullWidth
          autoComplete="off"
          className="mb-2"
          helperText="i.e. YouTube URL"
          id="source"
          name="source"
          label="Source"
          variant="outlined"
          value={state.data.source}
          onChange={handleInputChange}
          sx={{
            width: "100%",
            maxWidth: "sm",
            display: "block",
          }}
        />
        {state.error ? <div className="mb-2">{state.error}</div> : null}
        {state.success ? <div className="mb-2">Success!</div> : null}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default CreatePostPage;
