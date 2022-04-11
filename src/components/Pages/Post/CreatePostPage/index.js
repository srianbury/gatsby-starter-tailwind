import * as React from "react";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
// import PropTypes from "prop-types"; TODO
import RichTextEditor from "react-rte";
import { getPost } from "../../../../graphql/queries";
import { Layout } from "../../../Layout";
import { Seo } from "../../../Seo";
import { OpenLoginModalButton } from "../../../Header/OpenLoginModalButton";
import { PostForm } from "..";

const CreatePostPage = ({ location }) => {
  const { user } = useAuthenticator(context => [context.user]);
  const postId = new URLSearchParams(location.search).get("id");
  const [error, setError] = useState(null);
  const [waitingForUpdateData, setWaitingForUpdateData] = useState(true);
  const [validId, setValidId] = useState(false);
  const [post, setPost] = useState(null);

  function waiting() {
    return postId && waitingForUpdateData;
  }

  useEffect(() => {
    if (!postId || !user) {
      return;
    }

    async function read() {
      try {
        setError(false);
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
          setPost({
            id: data.id,
            muscles: data.muscles,
            source: data.source,
            title: data.title,
            body: RichTextEditor.createValueFromString(data.body, "markdown"),
          });
          console.log({ data });
          setValidId(true);
        }
      } catch (e) {
        console.log({ e });
        setError(true);
      } finally {
        setWaitingForUpdateData(false);
      }
    }
    read();
  }, [postId, user]);

  return (
    <Layout>
      <Seo title="Post" />
      {!user ? (
        <div>
          <div className="mb-2">Login to Create a Post</div>
          <OpenLoginModalButton />
        </div>
      ) : (
        <div>
          <h1 className="mb-2">{validId ? "Update" : "Create"} a Post</h1>
          {error ? (
            <div>An unexpected error occurred.</div>
          ) : waiting() ? (
            <div>Loading...</div>
          ) : (
            <PostForm post={post} />
          )}
        </div>
      )}
    </Layout>
  );
};

export { CreatePostPage };
