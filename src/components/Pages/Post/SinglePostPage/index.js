import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Skeleton, Button, Box, Alert } from "@mui/material";
import { navigate } from "gatsby";

import { Layout } from "../../../Layout";
import { Seo } from "../../../Seo";
import { getPost } from "../../../../graphql/queries";
import { deletePost } from "../../../../graphql/mutations";
import { formattedDate } from "../../../../utils";
import { navigation } from "../../../../constants";
import { SelectedMuscleChips } from "../PostForm/MuscleSelect";

const SinglePostPage = ({ params }) => {
  const { user } = useAuthenticator(context => [context.user]);
  const [post, setPost] = useState(null);
  const postId = params[`postId`];

  useEffect(() => {
    async function read() {
      try {
        const result = await API.graphql({
          query: getPost,
          variables: { id: postId },
          authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });
        setPost(result.data.getPost);
        console.log({ result });
      } catch (e) {
        console.log({ e });
      }
    }
    read();
  }, [user, postId]);

  return (
    <Layout>
      <Seo title={`Post${post ? ` - ${post.title}` : ""}`} />
      {post === null ? (
        <PostViewSkeleton />
      ) : (
        <PostView post={post} user={user} />
      )}
    </Layout>
  );
};

const PostView = ({ post, user }) => (
  <div>
    <div className="flex justify-center text-center">
      <div className="w-full max-w-md">
        <h2>{post.title}</h2>
        <div>{`${post.owner} • ${formattedDate(post.createdAt)}`}</div>
        <SourceController youtubeVideoId={post.youtubeVideoId} />
      </div>
    </div>
    <SelectedMuscleChips muscles={post.muscles} />
    <Box sx={{ py: 1 }}>
      <div style={{ whiteSpace: "pre-line" }}>{post.body}</div>
    </Box>
    <DeletePostButton post={post} user={user} />
  </div>
);
PostView.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const DeletePostButton = ({ post, user }) => {
  const [state, setState] = useState({
    loading: false,
    error: false,
  });

  async function handleDelete() {
    setState({
      loading: true,
      error: false,
    });
    try {
      const result = await API.graphql({
        query: deletePost,
        variables: {
          input: {
            id: post.id,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      if (!result.errors) {
        navigate(navigation.HOME_TO);
      }
    } catch (e) {
      setState({
        loading: false,
        error: true,
      });
    }
  }

  function handleEdit() {
    navigate(navigation.toEditPage(post.id));
  }

  return user && user.username === post.owner ? (
    <div className="mt-2 flex justify-end">
      <div>
        <div className="grid justify-items-end">
          <div>
            <Button
              variant="outlined"
              onClick={handleEdit}
              sx={{
                marginLeft: 1,
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              disabled={state.loading}
              sx={{
                marginLeft: 1,
              }}
            >
              Delete
            </Button>
          </div>
        </div>
        {state.error ? (
          <Alert severity="error" variant="outlined" sx={{ marginTop: 1 }}>
            An unexpected error occurred.
          </Alert>
        ) : null}
      </div>
    </div>
  ) : null;
};
DeletePostButton.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const SourceController = ({ youtubeVideoId }) => {
  if (!youtubeVideoId) {
    return null;
  }

  return (
    <div className="yt-iframe-container mb-2">
      <iframe
        className="yt-iframe-responsive-iframe"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
SourceController.propTypes = {
  youtubeVideoId: PropTypes.string,
};

const PostViewSkeleton = () => (
  <div>
    <div className="flex justify-center text-center">
      <div>
        <Skeleton sx={{ maxWidth: "100%", width: "500px" }}>
          <h2>Placeholder</h2>
        </Skeleton>
        <div className="flex justify-center text-center">
          <Skeleton>
            <div>username • Feb 22, 2022</div>
          </Skeleton>
        </div>
      </div>
    </div>
    <Skeleton sx={{ maxWidth: "100%", width: "100%" }} />
    <Skeleton sx={{ maxWidth: "100%", width: "100%" }} />
    <Skeleton sx={{ maxWidth: "100%", width: "100%" }} />
  </div>
);

export { SinglePostPage };
