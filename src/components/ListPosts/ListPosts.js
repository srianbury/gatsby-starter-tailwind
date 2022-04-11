import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { API } from "aws-amplify"; // graphqlOperation
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Box, Skeleton, Button, Tooltip } from "@mui/material";
import { searchPosts } from "../../graphql/queries";
import { formattedDate } from "../../utils";

const PAGINATION_LIMIT = 5;
const INIT_POST_STATE = {
  data: null,
  error: null,
};
const ListPosts = ({ searchQuery }) => {
  const { user } = useAuthenticator(context => [context.user]);
  const [posts, setPosts] = useState(INIT_POST_STATE);
  const [readingMore, setReadingMore] = useState(false);

  useEffect(() => {
    async function read() {
      try {
        setPosts(INIT_POST_STATE);
        const result = await API.graphql({
          query: searchPosts,
          variables: {
            sort: { direction: "desc", field: "createdAt" },
            filter: searchQuery
              ? { title: { matchPhrase: searchQuery } }
              : null,
            limit: PAGINATION_LIMIT,
          },
          authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        });
        console.log({ result });
        setPosts(cur => ({
          ...cur,
          data: result.data.searchPosts,
        }));
      } catch (e) {
        setPosts(cur => ({
          ...cur,
          error: "An unexpected error occurred.",
        }));
        console.log("searchPosts", { e });
      }
    }
    read();
  }, [user, searchQuery]);

  async function readMore() {
    try {
      setReadingMore(true);
      const result = await API.graphql({
        query: searchPosts,
        variables: {
          sort: { direction: "desc", field: "createdAt" },
          limit: PAGINATION_LIMIT,
          filter: searchQuery ? { title: { matchPhrase: searchQuery } } : null,
          nextToken: posts.data.nextToken,
        },
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      console.log({ result });
      setPosts(cur => ({
        ...cur,
        data: {
          items: [...cur.data.items, ...result.data.searchPosts.items],
          nextToken: result.data.searchPosts.nextToken,
        },
      }));
    } catch (e) {
      setPosts(cur => ({
        ...cur,
        error: "An unexpected error occurred.",
      }));
      console.log("searchPosts", { e });
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
    return (
      <div>
        {!!searchQuery
          ? `No results were found for "${searchQuery}". Try adjusting your search.`
          : "No posts."}
      </div>
    );
  }

  return (
    <div>
      {posts.error ? <div>{posts.error}</div> : null}
      {searchQuery ? (
        <Box sx={{ mb: 1 }}>Search results for: "{searchQuery}"</Box>
      ) : null}
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
          >
            {posts.data.nextToken ? "Load More" : "No more Posts"}
          </Button>
        </div>
      </div>
    </div>
  );
};
ListPosts.propTypes = {
  searchQuery: PropTypes.string,
};
ListPosts.defaultProps = {
  searchQuery: null,
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
    <div className="m-1">
      <StyledHeader to={`/post/${post.id}/`}>
        <Tooltip title={post.title} placement="bottom" enterDelay={500}>
          <h4 className="break-words line-clamp-2">{post.title}</h4>
        </Tooltip>
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

export { ListPosts };
