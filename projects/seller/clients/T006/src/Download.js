import { useQuery, gql } from '@apollo/client';

const Download = ({ className, id }) => {
  const { loading, error, data } = useQuery(
    gql`
      query ($id: ID!) {
        FileUpload(where: { id: $id }) {
          id
          file {
            publicUrl
          }
        }
      }
    `,
    { variables: { id } }
  );
  if (loading || error) return 'loading...';
  const {
    FileUpload: {
      file: { publicUrl },
    },
  } = data;
  return (
    <a className={className} role="button" href={`https://seller.itoa.vn${publicUrl}`} download>
      Download
    </a>
  );
};
export default Download;
