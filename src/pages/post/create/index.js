import * as React from "react";
import { useState } from "react";
import { Link } from "gatsby";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, TextField, Box, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPost } from "../../../graphql/mutations";
import Layout from "../../../components/layout";
import Seo from "../../../components/seo";
import { OpenLoginModalButton } from "../../../components/header";
// import { getYoutubeVideoId } from "../../../utils";

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
const CreatePostPage = () => {
  const { user } = useAuthenticator(context => [context.user]);
  const [afterFetchData, setAfterFetchData] = useState({
    error: null,
    data: null,
  });

  async function handleSubmit(
    values,
    { setSubmitting, resetForm, setFieldError }
  ) {
    try {
      // const youtubeVideoId = getYoutubeVideoId(values.source);
      setAfterFetchData({ error: null, data: null });
      if (!values.body.getEditorState().getCurrentContent().hasText()) {
        setFieldError("body", "Description cannot be blank.");
        return;
      }
      const result = await API.graphql({
        query: createPost,
        variables: {
          input: { ...values, body: values.body.toString("markdown") },
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resetForm();
      setAfterFetchData({
        error: null,
        data: result.data.createPost,
      });
    } catch (e) {
      setAfterFetchData({
        error: "An unexpected error occurred.",
        data: null,
      });
      console.log({ e });
    } finally {
      setSubmitting(false);
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
          <h1 className="mb-2">Create a Post</h1>
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
            {afterFetchData.error ? (
              <div className="mb-2">{afterFetchData.error}</div>
            ) : null}
            {afterFetchData.data ? (
              <div className="mb-2">
                <div>Success!</div>
                <StyledLink to={`/post/${afterFetchData.data.id}/`}>
                  View Post
                </StyledLink>
              </div>
            ) : null}
            <Button
              type="submit"
              variant="outlined"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </form>
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
