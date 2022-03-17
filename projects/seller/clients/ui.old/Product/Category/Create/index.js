import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductCategoryCreateInput) {
    createProductCategory(data: $data) {
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

export default function ProductCategoryCreate({ UI, children, productcategory }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductCategory } = data;
  return (
    <UI productcategory={productcategory} on={on} createProductCategory={createProductCategory} /> ||
    children({ productcategory, on, createProductCategory })
  );
}
