import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const query = gql`
  query ($id: ID!) {
    ProductBrand(where: { id: $id }) {
      id
      name
      url
    }
  }
`;

export default function ProductBrandItem({ id, UI, children }) {
  if (!id) return "id required";
  const router = useRouter();
  const { locale } = router;
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductBrand: productbrand } = data;
  return <UI productbrand={productbrand} /> || children({ productbrand });
}
