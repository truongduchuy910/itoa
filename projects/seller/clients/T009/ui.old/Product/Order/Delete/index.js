import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductOrder(id: $id) {
      id
      code
      isExport
      payment
      saving
      total
    }
  }
`;

export default function ProductOrderDelete({ UI, children, productorder }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductOrder } = data;
  return (
    <UI productorder={productorder} on={on} deleteProductOrder={deleteProductOrder} /> ||
    children({ productorder, on, deleteProductOrder })
  );
}
