import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, TextField, Box } from "@mui/material";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { createPost } from "../../../graphql/mutations";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import { OpenLoginModalButton } from "../../../components/header";

const toolbarConfig = {
  display: ["INLINE_STYLE_BUTTONS", "BLOCK_TYPE_BUTTONS"],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Strikethrough", style: "STRIKETHROUGH" },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
  ],
};

const INIT_POST_STATE = {
  error: null,
  success: {
    bool: false,
    data: {},
  },
  data: {
    title: "",
    body: RichTextEditor.createEmptyValue(),
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

  function handleRichTextInputChange(value) {
    setState(cur => ({
      ...cur,
      data: {
        ...cur.data,
        body: value,
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
        variables: {
          input: { ...state.data, body: state.data.body.toString("markdown") },
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });

      setState({
        ...INIT_POST_STATE,
        success: {
          bool: true,
          data: result.data.createPost,
        },
      });
      console.log({ result, state });
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
      {!user ? (
        <div>
          Login to Create a Post
          <OpenLoginModalButton />
        </div>
      ) : (
        <div>
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
            <div className="mb-2">
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "md",
                  display: "block",
                  border: "2px solid rgb(118, 118, 118)",
                  borderRadius: "4px",
                }}
              >
                <RichTextEditor
                  id="body"
                  name="body"
                  className="custom-rte-editor-style"
                  toolbarConfig={toolbarConfig}
                  value={state.data.body}
                  onChange={handleRichTextInputChange}
                />
              </Box>
            </div>
            {state.error ? <div className="mb-2">{state.error}</div> : null}
            {state.success.bool ? (
              <div className="mb-2">
                <div>Success!</div>
                <StyledLink to={`/post/${state.success.data.id}/`}>
                  View Post
                </StyledLink>
              </div>
            ) : null}
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </div>
      )}
    </Layout>
  );
};

const StyledLink = ({ to, children }) => {
  return (
    <Box
      sx={{
        color: "primary.main",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};
StyledLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CreatePostPage;
