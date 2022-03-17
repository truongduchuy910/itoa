import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductAttributeCreateInput) {
    createProductAttribute(data: $data) {
      id
      name
      label
      url
    }
  }
`;

export default function ProductAttributeCreate({ UI, children, productattribute }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductAttribute } = data;
  return (
    <UI productattribute={productattribute} on={on} createProductAttribute={createProductAttribute} /> ||
    children({ productattribute, on, createProductAttribute })
  );
}
