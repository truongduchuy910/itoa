import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductStockUpdateInput) {
    updateProductStock(id: $id, data: $data) {
      id
      quantity
      image {
        publicUrl
      }
    }
  }
`;

export default function ProductStockUpdate({ UI, children, productstock }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductStock } = data;
  return (
    <UI productstock={productstock} on={on} updateProductStock={updateProductStock} /> ||
    children({ productstock, on, updateProductStock })
  );
}
