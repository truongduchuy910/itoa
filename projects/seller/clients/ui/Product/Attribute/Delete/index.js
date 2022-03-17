import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductAttribute(id: $id) {
      id
      name
      label
      url
    }
  }
`;

export default function ProductAttributeDelete({ UI, children, productattribute }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductAttribute } = data;
  return (
    <UI productattribute={productattribute} on={on} deleteProductAttribute={deleteProductAttribute} /> ||
    children({ productattribute, on, deleteProductAttribute })
  );
}
