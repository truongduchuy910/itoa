import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductStockCreateInput) {
    createProductStock(data: $data) {
      id
      quantity
      image {
        publicUrl
      }
    }
  }
`;

export default function ProductStockCreate({ UI, children, productstock }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductStock } = data;
  return (
    <UI productstock={productstock} on={on} createProductStock={createProductStock} /> ||
    children({ productstock, on, createProductStock })
  );
}
