import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProduct(id: $id) {
      id
      image {
        publicUrl
      }
      name
      price
      sale
      isOutOfStock
      quantity
      status
      description
      detail {
        publicUrl
      }
      guide
      isDraft
      url
    }
  }
`;

export default function ProductDelete({ UI, children, product }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProduct } = data;
  return (
    <UI product={product} on={on} deleteProduct={deleteProduct} /> ||
    children({ product, on, deleteProduct })
  );
}
