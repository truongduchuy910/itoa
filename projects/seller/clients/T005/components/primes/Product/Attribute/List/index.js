import { gql, useQuery } from "@apollo/client";
import Loading from "../../../../elements/Loading";
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
  const { data, error, loading } = useQuery(PRODUCTATTRIBUTES_QUERY, {
    variables: {
      first,
      skip,
      condition: ProductAttributeWhereInput,
    },
  });
  if (loading || error)
    return <Loading style={{ marginTop: 13, marginBottom: 13 }} />;
  const { allProductAttributes } = data;
  return <UI allProductAttributes={allProductAttributes} />;
};
export default ProductAttributes;
