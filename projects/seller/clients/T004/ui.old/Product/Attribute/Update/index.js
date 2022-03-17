import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductAttributeUpdateInput) {
    updateProductAttribute(id: $id, data: $data) {
      id
      name
      label
      url
    }
  }
`;

export default function ProductAttributeUpdate({ UI, children, productattribute }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductAttribute } = data;
  return (
    <UI productattribute={productattribute} on={on} updateProductAttribute={updateProductAttribute} /> ||
    children({ productattribute, on, updateProductAttribute })
  );
}
