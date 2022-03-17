import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductBrandCreateInput) {
    createProductBrand(data: $data) {
      id
      name
      url
    }
  }
`;

export default function ProductBrandCreate({ UI, children, productbrand }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductBrand } = data;
  return (
    <UI productbrand={productbrand} on={on} createProductBrand={createProductBrand} /> ||
    children({ productbrand, on, createProductBrand })
  );
}
