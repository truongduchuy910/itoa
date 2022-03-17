import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    ProductStock(where: { id: $id }) {
      id
      quantity
      image {
        publicUrl
      }
    }
  }
`;

export default function ProductStockItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductStock: productstock } = data;
  return <UI productstock={productstock} /> || children({ productstock });
}
