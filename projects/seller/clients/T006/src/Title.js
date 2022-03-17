import { useQuery, gql } from '@apollo/client';
const Title = ({ id }) => {
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
    Post: { title },
  } = data;
  return title;
};
export default Title;
