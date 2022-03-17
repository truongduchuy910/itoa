import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductStock(id: $id) {
      id
      quantity
      image {
        publicUrl
      }
    }
  }
`;

export default function ProductStockDelete({ UI, children, productstock }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductStock } = data;
  return (
    <UI productstock={productstock} on={on} deleteProductStock={deleteProductStock} /> ||
    children({ productstock, on, deleteProductStock })
  );
}
