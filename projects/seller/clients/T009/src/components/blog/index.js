import { gql, useQuery } from "@apollo/client";
import React from "react";
import GridWith from "./GridWith";
const Blogs = ({
  first = 9,
  skip = 0,
  sortBy,
  PostWhereInput,
  related, //PostWhereInput
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
        $related: PostWhereInput
      ) {
        allPosts(first: 1, where: $post) {
          id
          title
          thumbnail {
            publicUrl
          }
          content
          description
          updatedAt
          hashtags {
            id
            name
            url
          }
          url
        }
        related: allPosts(
          sortBy: $sortBy
          first: $first
          skip: $skip
          where: $related
        ) {
          id
          title
          thumbnail {
            publicUrl
          }
          description
          updatedAt
          hashtags {
            id
            name
            url
          }
          url
        }
      }
    `,
    { variables: { sortBy, first, skip, post: { ...PostWhereInput }, related } }
  );
  if (loading || error) return "";
  const {
    allPosts: [page],
    related: r,
  } = data;

  const Render = UI ? UI : GridWith;
  return <Render page={page} related={r} variants={variants} />;
};
export default Blogs;
