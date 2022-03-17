import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductCategory(id: $id) {
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

export default function ProductCategoryDelete({ UI, children, productcategory }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductCategory } = data;
  return (
    <UI productcategory={productcategory} on={on} deleteProductCategory={deleteProductCategory} /> ||
    children({ productcategory, on, deleteProductCategory })
  );
}
