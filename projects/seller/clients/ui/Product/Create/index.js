import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductCreateInput) {
    createProduct(data: $data) {
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

export default function ProductCreate({ UI, children, product }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProduct } = data;
  return (
    <UI product={product} on={on} createProduct={createProduct} /> ||
    children({ product, on, createProduct })
  );
}
