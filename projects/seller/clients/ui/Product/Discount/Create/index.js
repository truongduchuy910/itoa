import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductDiscountCreateInput) {
    createProductDiscount(data: $data) {
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

export default function ProductDiscountCreate({ UI, children, productdiscount }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductDiscount } = data;
  return (
    <UI productdiscount={productdiscount} on={on} createProductDiscount={createProductDiscount} /> ||
    children({ productdiscount, on, createProductDiscount })
  );
}
