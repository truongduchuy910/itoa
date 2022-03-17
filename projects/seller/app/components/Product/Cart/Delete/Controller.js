import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $ids: [ID]) {
    deleteProductCart(id: $id) {
      id
      ip
    }
    deleteProductCartItems(ids: $ids) {
      id
    }
  }
`;

export default function ProductCartDelete({ UI, children, productcart }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductCart } = data;
  return (
    (
      <UI
        productcart={productcart}
        on={on}
        deleteProductCart={deleteProductCart}
      />
    ) || children({ productcart, on, deleteProductCart })
  );
}
