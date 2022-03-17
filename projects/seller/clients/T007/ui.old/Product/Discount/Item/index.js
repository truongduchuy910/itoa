import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query($id: ID!) {
    ProductDiscount(where: { id: $id }) {
      id
      code
      type
      value
      name
      description
      condition
      image {
        publicUrl
      }
      url
    }
  }
`;

export default function ProductDiscountItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductDiscount: productdiscount } = data;
  return <UI productdiscount={productdiscount} /> || children({ productdiscount });
}
