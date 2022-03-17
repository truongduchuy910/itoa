import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query($id: ID!) {
    ProductOrder(where: { id: $id }) {
      id
      code
      isExport
      payment
      saving
      total
    }
  }
`;

export default function ProductOrderItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductOrder: productorder } = data;
  return <UI productorder={productorder} /> || children({ productorder });
}
