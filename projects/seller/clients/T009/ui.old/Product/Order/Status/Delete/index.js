import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductOrderStatus(id: $id) {
      id
      value
      color
    }
  }
`;

export default function ProductOrderStatusDelete({ UI, children, productorderstatus }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductOrderStatus } = data;
  return (
    <UI productorderstatus={productorderstatus} on={on} deleteProductOrderStatus={deleteProductOrderStatus} /> ||
    children({ productorderstatus, on, deleteProductOrderStatus })
  );
}
