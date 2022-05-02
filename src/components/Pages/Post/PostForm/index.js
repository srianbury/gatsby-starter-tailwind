import * as React from "react";
import { useState } from "react";
import { navigate } from "gatsby";
import { API } from "aws-amplify";
import { Button, TextField, Box, FormHelperText } from "@mui/material";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "gatsby";
import { MuscleSelect, formatMuscles } from "./MuscleSelect";
import { createPost, updatePost } from "../../../../graphql/mutations";
import { getYoutubeVideoId } from "../../../../utils";
import { navigation } from "../../../../constants";

const POST_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
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

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    try {
      setError(null);
      const result = await API.graphql({
        query: post ? updatePost : createPost,
        variables: {
          input: {
            ...values,
            ...(post ? { id: post.id } : {}),
            body: values.body,
            youtubeVideoId: getYoutubeVideoId(values.source),
            muscles: Object.keys(selectedMuscles),
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log({ result });
      navigate(
        navigation.postToAddress(
          result.data[post ? "updatePost" : "createPost"].id
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "md",
        }}
      >
        <TextField
          fullWidth
          multiline
          label="Description"
          id="body"
          name="body"
          {...formik.getFieldProps("body")}
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
      {error ? <div className="mb-2">{error}</div> : null}
      {post ? (
        <Button
          sx={{ mr: 1 }}
          variant="outlined"
          component={Link}
          to={`/${navigation.POST}/${post.id}/`}
          color="secondary"
        >
          Cancel
        </Button>
      ) : null}
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
