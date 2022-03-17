import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
export const PRODUCTATTRIBUTES_QUERY = gql`
  query ($first: Int, $skip: Int, $condition: ProductAttributeWhereInput) {
    allProductAttributes(first: $first, skip: $skip, where: $condition) {
      id
      name
      values {
        id
        value
        file {
          publicUrl
        }
      }
    }
  }
`;
export const PRODUCTATTRIBUTES_VARS = { first: 7, skip: 0 };
const ProductAttributes = ({
  UI,
  first = PRODUCTATTRIBUTES_VARS.first,
  skip = PRODUCTATTRIBUTES_VARS.skip,
  ProductAttributeWhereInput,
}) => {
  const router = useRouter();
  const { locale } = router;
  const { data, error, loading } = useQuery(PRODUCTATTRIBUTES_QUERY, {
    variables: {
      first,
      skip,
      condition: ProductAttributeWhereInput,
      locale,
    },
  });
  if (loading || error) return "...";
  const { allProductAttributes } = data;
  return <UI allProductAttributes={allProductAttributes} />;
};
export default ProductAttributes;
