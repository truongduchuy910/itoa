import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    ProductCartItem(where: { id: $id }) {
      id
      sale
      price
      quantity
    }
  }
`;

export default function ProductCartItemItem({ id, UI, children }) {
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return "error";
  const { ProductCartItem: productcartitem } = data;
  return (
    <UI productcartitem={productcartitem} /> || children({ productcartitem })
  );
}
