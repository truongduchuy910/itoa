import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductOrderUpdateInput) {
    updateProductOrder(id: $id, data: $data) {
      id
      code
      isExport
      payment
      saving
      total
    }
  }
`;

export default function ProductOrderUpdate({ UI, children, productorder }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductOrder } = data;
  return (
    <UI productorder={productorder} on={on} updateProductOrder={updateProductOrder} /> ||
    children({ productorder, on, updateProductOrder })
  );
}
