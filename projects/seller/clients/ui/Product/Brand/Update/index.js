import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductBrandUpdateInput) {
    updateProductBrand(id: $id, data: $data) {
      id
      name
      url
    }
  }
`;

export default function ProductBrandUpdate({ UI, children, productbrand }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductBrand } = data;
  return (
    <UI productbrand={productbrand} on={on} updateProductBrand={updateProductBrand} /> ||
    children({ productbrand, on, updateProductBrand })
  );
}
