import React from "react";
import { useParams } from "react-router-dom";
import Footer from "components/footers";
import Blogs from "components/blogs";
import PopularAndRecentBlogPosts from "components/blogs/PopularAndRecentBlogPosts.js";
import Headers from "components/headers";
import { gql, useQuery } from "@apollo/client";

export default () => {
  const { hashtag } = useParams();

  return (
    <div>
      <Headers />
      <Main hashtag={hashtag} />
      
    </div>
  );
};
const Main = ({ hashtag }) => {
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
    <Blogs
      UI={PopularAndRecentBlogPosts}
      first={7}
      sortBy="updatedAt_DESC"
      PostWhereInput={{ hashtags_some: { url: hashtag } }}
      variants={{
        title: data?.allPostHashtags ? data.allPostHashtags[0]?.name : "...",
      }}
    />
  );
};
