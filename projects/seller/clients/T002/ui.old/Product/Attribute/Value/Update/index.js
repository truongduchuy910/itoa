import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductAttributeValueUpdateInput) {
    updateProductAttributeValue(id: $id, data: $data) {
      id
      value
      file {
        publicUrl
      }
    }
  }
`;

export default function ProductAttributeValueUpdate({ UI, children, productattributevalue }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductAttributeValue } = data;
  return (
    <UI productattributevalue={productattributevalue} on={on} updateProductAttributeValue={updateProductAttributeValue} /> ||
    children({ productattributevalue, on, updateProductAttributeValue })
  );
}
