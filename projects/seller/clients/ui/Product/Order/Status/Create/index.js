import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductOrderStatusCreateInput) {
    createProductOrderStatus(data: $data) {
      id
      value
      color
    }
  }
`;

export default function ProductOrderStatusCreate({ UI, children, productorderstatus }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductOrderStatus } = data;
  return (
    <UI productorderstatus={productorderstatus} on={on} createProductOrderStatus={createProductOrderStatus} /> ||
    children({ productorderstatus, on, createProductOrderStatus })
  );
}
