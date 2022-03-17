import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query($id: ID!) {
    ProductHashtag(where: { id: $id }) {
      id
      name
      url
    }
  }
`;

export default function ProductHashtagItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductHashtag: producthashtag } = data;
  return <UI producthashtag={producthashtag} /> || children({ producthashtag });
}
