import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { API } from "aws-amplify"; // graphqlOperation
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Skeleton, Button } from "@mui/material";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { postsByDate } from "../graphql/queries";
import { formattedDate } from "../utils";

const PAGINATION_LIMIT = 1;

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <ListPosts />
    </Layout>
  );
};

const INIT_POST_STATE = {
  data: null,
  error: null,
};
const ListPosts = () => {
  const { user } = useAuthenticator(context => [context.user]);
  const [posts, setPosts] = useState(INIT_POST_STATE);
  const [readingMore, setReadingMore] = useState(false);

  useEffect(() => {
    async function read() {
      try {
        setPosts(INIT_POST_STATE);
        const result = await API.graphql({
          query: postsByDate,
          variables: {
            type: "Post",
            sortDirection: "DESC",
            limit: PAGINATION_LIMIT,
          },
          authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });
        console.log({ result });
        setPosts(cur => ({
          ...cur,
          data: result.data.PostsByDate,
        }));
      } catch (e) {
        setPosts(cur => ({
          ...cur,
          error: "An unexpected error occurred.",
        }));
        console.log("postsByDate", { e });
      }
    }
    read();
  }, [user]);

  async function readMore() {
    try {
      setReadingMore(true);
      const result = await API.graphql({
        query: postsByDate,
        variables: {
          type: "Post",
          sortDirection: "DESC",
          limit: PAGINATION_LIMIT,
          nextToken: posts.data.nextToken,
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      console.log({ result });
      setPosts(cur => ({
        ...cur,
        data: {
          items: [...cur.data.items, ...result.data.PostsByDate.items],
          nextToken: result.data.PostsByDate.nextToken,
        },
      }));
    } catch (e) {
      setPosts(cur => ({
        ...cur,
        error: "An unexpected error occurred.",
      }));
      console.log("postsByDate", { e });
    } finally {
      setReadingMore(false);
    }
  }

  if (posts.error !== null && posts.data === null) {
    return <div>{posts.error}</div>;
  }

  if (posts.data === null) {
    return (
      <div>
        <PostSkeletons />
      </div>
    );
  }

  if (posts.data.items.length === 0) {
    return <div>No posts.</div>;
  }

  return (
    <div>
      {posts.error ? <div>{posts.error}</div> : null}
      <div className="grid grid-cols-1 gap-4 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.data.items.map(post => (
          <PostView key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center">
        <div>
          <Button
            variant="outlined"
            onClick={readMore}
            disabled={readingMore || !posts.data.nextToken}
            loading={readingMore}
          >
            {posts.data.nextToken ? "Load More" : "No more Posts"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const StyledHeader = ({ to, children }) => {
  return (
    <Box
      sx={{
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      <Link to={to}>{children}</Link>
    </Box>
  );
};
StyledHeader.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const PostView = ({ post }) => (
  <div className="mb-4">
    <Link to={`/post/${post.id}/`}>
      <img
        className="w-full"
        src={`https://img.youtube.com/vi/${
          post.youtubeVideoId || "pyrkdP_IwiU"
        }/hqdefault.jpg`}
        alt="pyrkdP_IwiU"
      />
    </Link>
    <div className="border-b-2 border-l-2 border-r-2 border-black p-2">
      <StyledHeader to={`/post/${post.id}/`}>
        <h2 className="break-words">{post.title}</h2>
      </StyledHeader>
      <div>{`${post.owner} • ${formattedDate(post.createdAt)}`}</div>
    </div>
  </div>
);
PostView.propTypes = {
  post: PropTypes.object.isRequired, // TODO add actual shape of post here
};

const PostSkeletons = () =>
  [1, 2, 3].map(val => (
    <div key={val} className="border-rounded mb-2 border-2 p-2">
      <Skeleton>
        <h1>Placeholder</h1>
      </Skeleton>
      <Skeleton sx={{ width: 200, maxWidth: "100%" }}>
        <div>Placeholder</div>
      </Skeleton>
    </div>
  ));

export default IndexPage;
