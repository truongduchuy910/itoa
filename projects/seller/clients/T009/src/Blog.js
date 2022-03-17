import React from "react";
import { useParams } from "react-router-dom";
import Footer from "components/footers";
import Blog from "components/blog";
import PopularAndRecentBlogPosts from "components/blogs/PopularAndRecentBlogPosts.js";
import Headers from "components/headers";
import { gql, useQuery } from "@apollo/client";

export default () => {
  const { hashtag, url } = useParams();

  return (
    <div>
      <Headers />
      <Main url={url} hashtag={hashtag} />
    </div>
  );
};
const Main = ({ url, hashtag }) => {
  const { loading, error, data, previousData } = useQuery(
    gql`
      query($url: String) {
        allPostHashtags(where: { url: $url }) {
          id
          name
        }
      }
    `,
    { variables: { url: hashtag } }
  );
  return (
    <Blog
      first={7}
      sortBy="updatedAt_DESC"
      PostWhereInput={{ url }}
      related={{ hashtags_some: hashtag !== "_" ? { url: hashtag } : null }}
      variants={{
        title: data?.allPostHashtags ? data.allPostHashtags[0]?.name : "...",
      }}
    />
  );
};
