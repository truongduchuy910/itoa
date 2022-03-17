import { useQuery, gql } from '@apollo/client';
const Img = ({ className, id }) => {
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
    Post: {
      title,
      thumbnail: { publicUrl },
    },
  } = data;
  return <img className={className} src={`https://seller.itoa.vn${publicUrl}`} alt={title} />;
};
export default Img;
