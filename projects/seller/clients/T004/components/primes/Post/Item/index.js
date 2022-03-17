import { gql, useQuery } from "@apollo/client";
import Loading from "../../../elements/Loading";
export const POST_QUERY = gql`
  query ($condition: PostWhereInput) {
    allPosts(first: 1, where: $condition) {
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
const Post = ({ UI, PostWhereInput }) => {
  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { condition: PostWhereInput },
  });
  if (loading || error) return <Loading variant={{ height: 200 }} />;
  const {
    allPosts: [post],
  } = data;
  return <UI post={post} />;
};
export default Post;
