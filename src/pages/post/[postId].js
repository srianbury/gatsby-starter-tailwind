import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";
import RichTextEditor from "react-rte";
import { Skeleton } from "@mui/material";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { getPost } from "../../graphql/queries";
import { domainName, queryParam, formattedDate } from "../../utils";
import "./styles.css";

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
      {post === null ? <PostViewSkeleton /> : <PostView post={post} />}
    </Layout>
  );
};

const PostView = ({ post }) => (
  <div>
    <div className="flex justify-center text-center">
      <div>
        <h2>{post.title}</h2>
        <div>{`${post.owner} • ${formattedDate(post.createdAt)}`}</div>
        <SourceController source={post.source} />
      </div>
    </div>
    <MarkdownViewer
      value={RichTextEditor.createValueFromString(post.body, "markdown")}
    />
  </div>
);
PostView.propTypes = {
  post: PropTypes.object.isRequired,
};

const YOUTUBE_VIDEO_ID_QUERY_PARAM = "v";
const SourceController = ({ source }) => {
  if (!source) {
    return null;
  }

  const domain = domainName(source).toUpperCase();
  const videoId = queryParam(source, YOUTUBE_VIDEO_ID_QUERY_PARAM);

  return (
    <div className="mb-1">
      {domain === "YOUTUBE" && videoId !== null ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        source
      )}
    </div>
  );
};
SourceController.propTypes = {
  source: PropTypes.string,
};

const MarkdownViewer = ({ value }) => (
  <div className="markdown-viewonly">
    <RichTextEditor readOnly value={value} toolbarConfig={{ display: [] }} />
  </div>
);

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

export default SinglePostPage;
