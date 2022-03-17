import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductAttributeValueCreateInput) {
    createProductAttributeValue(data: $data) {
      id
      value
      file {
        publicUrl
      }
    }
  }
`;

export default function ProductAttributeValueCreate({ UI, children, productattributevalue }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductAttributeValue } = data;
  return (
    <UI productattributevalue={productattributevalue} on={on} createProductAttributeValue={createProductAttributeValue} /> ||
    children({ productattributevalue, on, createProductAttributeValue })
  );
}
