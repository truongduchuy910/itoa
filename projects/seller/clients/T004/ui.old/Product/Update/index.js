import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductUpdateInput) {
    updateProduct(id: $id, data: $data) {
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

export default function ProductUpdate({ UI, children, product }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProduct } = data;
  return (
    <UI product={product} on={on} updateProduct={updateProduct} /> ||
    children({ product, on, updateProduct })
  );
}
