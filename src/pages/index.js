import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { API } from "aws-amplify"; // graphqlOperation
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Skeleton } from "@mui/material";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { listPosts } from "../graphql/queries";
import { formattedDate } from "../utils";

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

  useEffect(() => {
    async function read() {
      try {
        setPosts(INIT_POST_STATE);
        const result = await API.graphql({
          query: listPosts,
          variables: {},
          authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });
        setPosts(cur => ({
          ...cur,
          data: result.data.listPosts.items,
        }));
        console.log({ result });
      } catch (e) {
        setPosts(cur => ({
          ...cur,
          error: "An unexpecte error occurred",
        }));
        console.log("listPosts", { e });
      }
    }
    read();
  }, [user]);

  if (posts.data === null) {
    return (
      <div>
        <PostSkeletons />
      </div>
    );
  }

  if (posts.error !== null) {
    return <div>{posts.error}</div>;
  }

  if (posts.data.length === 0) {
    return <div>No posts.</div>;
  }

  return (
    <div>
      {posts.data.map(post => (
        <PostView key={post.id} post={post} />
      ))}
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
  <div className="border-rounded mb-2 border-2 p-2">
    <StyledHeader to={`/post/${post.id}/`}>
      <h2>{post.title}</h2>
    </StyledHeader>
    <div>{`${post.owner} • ${formattedDate(post.createdAt)}`}</div>
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
