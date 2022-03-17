import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query($id: ID!) {
    ProductOrderStatus(where: { id: $id }) {
      id
      value
      color
    }
  }
`;

export default function ProductOrderStatusItem({ id, UI, children }) {
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductOrderStatus: productorderstatus } = data;
  return <UI productorderstatus={productorderstatus} /> || children({ productorderstatus });
}
