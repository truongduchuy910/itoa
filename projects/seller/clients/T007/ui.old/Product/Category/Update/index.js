import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductCategoryUpdateInput) {
    updateProductCategory(id: $id, data: $data) {
      id
      name
      description
      file {
        publicUrl
      }
      prioritize
      url
    }
  }
`;

export default function ProductCategoryUpdate({ UI, children, productcategory }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductCategory } = data;
  return (
    <UI productcategory={productcategory} on={on} updateProductCategory={updateProductCategory} /> ||
    children({ productcategory, on, updateProductCategory })
  );
}
