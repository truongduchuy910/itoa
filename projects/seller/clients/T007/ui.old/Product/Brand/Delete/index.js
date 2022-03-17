import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductBrand(id: $id) {
      id
      name
      url
    }
  }
`;

export default function ProductBrandDelete({ UI, children, productbrand }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductBrand } = data;
  return (
    <UI productbrand={productbrand} on={on} deleteProductBrand={deleteProductBrand} /> ||
    children({ productbrand, on, deleteProductBrand })
  );
}
