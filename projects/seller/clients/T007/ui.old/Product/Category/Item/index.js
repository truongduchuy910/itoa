import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const query = gql`
  query ($id: ID!) {
    ProductCategory(where: { id: $id }) {
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

export default function ProductCategoryItem({ id, UI, children }) {
  if (!id) return "id required";
  const router = useRouter();
  const { locale } = router;
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductCategory: productcategory } = data;
  return (
    <UI productcategory={productcategory} /> || children({ productcategory })
  );
}
