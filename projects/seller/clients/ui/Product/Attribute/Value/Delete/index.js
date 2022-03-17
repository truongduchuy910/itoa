import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductAttributeValue(id: $id) {
      id
      value
      file {
        publicUrl
      }
    }
  }
`;

export default function ProductAttributeValueDelete({ UI, children, productattributevalue }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductAttributeValue } = data;
  return (
    <UI productattributevalue={productattributevalue} on={on} deleteProductAttributeValue={deleteProductAttributeValue} /> ||
    children({ productattributevalue, on, deleteProductAttributeValue })
  );
}
