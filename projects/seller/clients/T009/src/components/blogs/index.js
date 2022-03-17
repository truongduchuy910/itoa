import { gql, useQuery } from "@apollo/client";
import React from "react";
import PopularAndRecentBlogPosts from "./PopularAndRecentBlogPosts";
const Blogs = ({
  first = 9,
  skip = 0,
  sortBy,
  PostWhereInput,
  UI,
  variants = {},
}) => {
  const { loading, error, data } = useQuery(
    gql`
      query(
        $first: Int
        $skip: Int
        $sortBy: [SortPostsBy!]
        $post: PostWhereInput
      ) {
        allPosts(sortBy: $sortBy, first: $first, skip: $skip, where: $post) {
          id
          title
          thumbnail {
            publicUrl
          }
          description
          updatedAt
          url
          hashtags {
            id
            name
            url
          }
        }
      }
    `,
    { variables: { sortBy, first, skip, post: { ...PostWhereInput } } }
  );
  if (loading || error) return "";
  const { allPosts } = data;
  const Render = UI ? UI : PopularAndRecentBlogPosts;

  return <Render allPosts={allPosts} variants={variants} />;
};
export default Blogs;
