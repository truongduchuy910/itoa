import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductOrderStatusUpdateInput) {
    updateProductOrderStatus(id: $id, data: $data) {
      id
      value
      color
    }
  }
`;

export default function ProductOrderStatusUpdate({ UI, children, productorderstatus }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductOrderStatus } = data;
  return (
    <UI productorderstatus={productorderstatus} on={on} updateProductOrderStatus={updateProductOrderStatus} /> ||
    children({ productorderstatus, on, updateProductOrderStatus })
  );
}
