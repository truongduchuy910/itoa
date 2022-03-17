import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductDiscount(id: $id) {
      id
      code
      type
      value
      name
      description
      condition
      image {
        publicUrl
      }
      url
    }
  }
`;

export default function ProductDiscountDelete({ UI, children, productdiscount }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductDiscount } = data;
  return (
    <UI productdiscount={productdiscount} on={on} deleteProductDiscount={deleteProductDiscount} /> ||
    children({ productdiscount, on, deleteProductDiscount })
  );
}
