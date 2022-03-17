import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Feature(where: { id: $id }) {
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

export default function FeatureItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Feature: feature } = data;
  return <UI feature={feature} /> || children({ feature });
}
