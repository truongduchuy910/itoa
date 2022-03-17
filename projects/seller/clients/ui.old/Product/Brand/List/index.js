import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
export const BRANDS_QUERY = gql`
  query {
    allProductBrands {
      id
      name
    }
  }
`;
const ProductBrands = ({ UI }) => {
  const router = useRouter();
  const { locale } = router;
  const { loading, error, data } = useQuery(BRANDS_QUERY);
  if (loading || error) return "...";
  const { allProductBrands } = data;
  return <UI allProductBrands={allProductBrands} />;
};
export default ProductBrands;
