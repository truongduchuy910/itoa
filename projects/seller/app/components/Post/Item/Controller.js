import { gql, useQuery } from "@apollo/client";
import Loading from "../../../elements/Loading";
export const POST_QUERY = gql`
  query (
    $first: Int
    $skip: Int
    $postWhereInput: PostWhereInput
    $seller: ID
  ) {
    allPosts(first: 1, where: $postWhereInput) {
      id
      title
      thumbnail {
        publicUrl
      }
      body
      createdAt
      description
      url
      createdBy {
        id
        name
        page {
          store
        }
      }
    }
  }
`;
const Post = ({ UI, postWhereInput, skip, first }) => {
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { postWhereInput, first, skip },
  });
  if (loading || error) return <Loading variant={{ height: 200 }} />;
  const {
    allPosts: [post],
  } = data;
  return <UI post={post} />;
};
export default Post;
