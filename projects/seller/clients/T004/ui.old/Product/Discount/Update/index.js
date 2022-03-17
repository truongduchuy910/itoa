import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductDiscountUpdateInput) {
    updateProductDiscount(id: $id, data: $data) {
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

export default function ProductDiscountUpdate({ UI, children, productdiscount }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductDiscount } = data;
  return (
    <UI productdiscount={productdiscount} on={on} updateProductDiscount={updateProductDiscount} /> ||
    children({ productdiscount, on, updateProductDiscount })
  );
}
