import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Banner(where: { id: $id }) {
      id
      name
      slogan
      image {
        publicUrl
      }
      description
      url
    }
  }
`;

export default function BannerItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Banner: banner } = data;
  return <UI banner={banner} /> || children({ banner });
}
