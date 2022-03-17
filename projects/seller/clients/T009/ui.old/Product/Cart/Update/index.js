import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductCartUpdateInput) {
    updateProductCart(id: $id, data: $data) {
      id
      ip
    }
  }
`;

export default function ProductCartUpdate({ UI, children, productcart }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductCart } = data;
  return (
    <UI productcart={productcart} on={on} updateProductCart={updateProductCart} /> ||
    children({ productcart, on, updateProductCart })
  );
}
