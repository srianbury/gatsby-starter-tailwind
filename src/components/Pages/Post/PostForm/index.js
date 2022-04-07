import * as React from "react";
import { useState } from "react";
import { navigate } from "gatsby";
import { API } from "aws-amplify";
import { Button, TextField, Box, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MuscleSelect, formatMuscles } from "./MuscleSelect";
import { createPost, updatePost } from "../../../../graphql/mutations";
import { getYoutubeVideoId } from "../../../../utils";
import { navigation } from "../../../../constants";

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
const POST_FORM_INITIAL_VALUES = {
  title: "",
  body: RichTextEditor.createEmptyValue(),
  source: "",
};
const PostForm = ({ post }) => {
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: { ...POST_FORM_INITIAL_VALUES, ...(post ? post : {}) },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      source: Yup.string(),
    }),
    onSubmit: handleSubmit,
  });
  const [selectedMuscles, setSelectedMuscles] = useState(
    post ? formatMuscles(post.muscles) : {}
  );

  function handleRichTextInputChange(value) {
    formik.setFieldValue("body", value);
  }

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    try {
      setError(null);
      if (!values.body.getEditorState().getCurrentContent().hasText()) {
        setFieldError("body", "Description cannot be blank.");
        return;
      }
      const result = await API.graphql({
        query: post ? updatePost : createPost,
        variables: {
          input: {
            ...values,
            ...(post ? { id: post.id } : {}),
            body: values.body.toString("markdown"),
            youtubeVideoId: getYoutubeVideoId(values.source),
            type: "Post",
            muscles: Object.keys(selectedMuscles),
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log({ result });
      navigate(
        navigation.postToAddress(
          result.data[post ? 'updatePost' : 'createPost'].id
        )
      );
    } catch (e) {
      setError("An unexpected error occurred.");
      setSubmitting(false);
      console.log({ e });
    }
  }

  return (
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "sm",
          display: "block",
          marginBottom: 1,
        }}
      >
        <MuscleSelect
          selectedMuscles={selectedMuscles}
          setSelectedMuscles={setSelectedMuscles}
        />
      </Box>
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
      <Button type="submit" variant="outlined" disabled={formik.isSubmitting}>
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
};
PostForm.propTypes = {
  post: PropTypes.object,
};

export { PostForm };
