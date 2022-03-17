import { useQuery, gql } from '@apollo/client';
const Post = ({ className, id }) => {
  const { loading, error, data } = useQuery(
    gql`
      query ($id: ID!) {
        Post(where: { id: $id }) {
          id
          title
          body
          thumbnail {
            publicUrl
          }
        }
      }
    `,
    { variables: { id } }
  );
  if (loading || error) return 'loading...';
  const {
    Post: { body },
  } = data;
  const __html = body.replace(`width="1280" height="642"`, `width="100%" height="100%"`);

  return <div className={className} dangerouslySetInnerHTML={{ __html }}></div>;
};
export default Post;
