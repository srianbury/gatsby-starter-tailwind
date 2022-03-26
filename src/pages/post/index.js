import * as React from "react";
import { useState, useEffect } from "react";
import { Link, navigate } from "gatsby";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, TextField, Box, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPost, updatePost } from "../../graphql/mutations";
import { getPost } from "../../graphql/queries";
import { Layout } from "../../components/Layout";
import Seo from "../../components/seo";
import { OpenLoginModalButton } from "../../components/header";
import { getYoutubeVideoId } from "../../utils";
import { postToAddress } from "../../constants/navigation";

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
const CreatePostPage = ({ location }) => {
  const postId = new URLSearchParams(location.search).get("id");
  const { user } = useAuthenticator(context => [context.user]);
  const [error, setError] = useState(null);
  const [waitingForUpdateData, setWaitingForUpdateData] = useState(true);
  const [validId, setValidId] = useState(false);

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    try {
      setError(null);
      if (!values.body.getEditorState().getCurrentContent().hasText()) {
        setFieldError("body", "Description cannot be blank.");
        return;
      }
      const result = await API.graphql({
        query: validId ? updatePost : createPost,
        variables: {
          input: {
            ...values,
            ...(validId ? { id: postId } : {}),
            body: values.body.toString("markdown"),
            youtubeVideoId: getYoutubeVideoId(values.source),
            type: "Post",
            muscles: [],
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log({ result });
      navigate(
        postToAddress(
          validId ? result.data.updatePost.id : result.data.createPost.id
        )
      );
    } catch (e) {
      setError("An unexpected error occurred.");
      setSubmitting(false);
      console.log({ e });
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      body: RichTextEditor.createEmptyValue(),
      source: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      // body: Yup.string().required("Description is required."),
      source: Yup.string(),
    }),
    onSubmit: handleSubmit,
  });

  function handleRichTextInputChange(value) {
    formik.setFieldValue("body", value);
  }

  function waiting() {
    return postId && waitingForUpdateData;
  }

  useEffect(() => {
    if (!postId) {
      return;
    }

    async function read() {
      try {
        const result = await API.graphql({
          query: getPost,
          variables: { id: postId },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        if (
          result.data.getPost &&
          user &&
          user.username === result.data.getPost.owner
        ) {
          const data = result.data.getPost;
          console.log({ data });
          formik.setFieldValue("title", data.title);
          formik.setFieldValue(
            "body",
            RichTextEditor.createValueFromString(data.body, "markdown")
          );
          formik.setFieldValue("source", data.source);
          setValidId(true);
        }
      } catch (e) {
        console.log({ e });
      } finally {
        setWaitingForUpdateData(false);
      }
    }
    read();
  }, [postId]);

  return (
    <Layout>
      <Seo title="Post - Create" />
      {!user ? (
        <div>
          <div className="mb-2">Login to Create a Post</div>
          <OpenLoginModalButton />
        </div>
      ) : (
        <div>
          <h1 className="mb-2">{validId ? "Update" : "Create"} a Post</h1>
          {waiting() ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                required
                fullWidth
                type="text"
                autoComplete="off"
                className="mb-2"
                label="Title"
                variant="outlined"
                {...formik.getFieldProps("title")}
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
                {...formik.getFieldProps("source")}
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
                    value={formik.values.body}
                    onChange={handleRichTextInputChange}
                  />
                </Box>
                <div className="ml-3">
                  <FormHelperText>Description</FormHelperText>
                </div>
                {formik.touched.body && formik.errors.body ? (
                  <div className="ml-3">
                    <FormHelperText error>{formik.errors.body}</FormHelperText>
                  </div>
                ) : null}
              </div>
              {error ? <div className="mb-2">{error}</div> : null}
              <Button
                type="submit"
                variant="outlined"
                disabled={formik.isSubmitting}
              >
                {validId ? "Update" : "Submit"}
              </Button>
            </form>
          )}
        </div>
      )}
    </Layout>
  );
};

const StyledLink = ({ to, children }) => (
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
StyledLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CreatePostPage;
