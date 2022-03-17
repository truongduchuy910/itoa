import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Service(where: { id: $id }) {
      id
      name
      image {
        publicUrl
      }
      description
      content
    }
  }
`;

export default function ServiceItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Service: service } = data;
  return <UI service={service} /> || children({ service });
}
