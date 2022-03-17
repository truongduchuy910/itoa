import { gql, useQuery } from "@apollo/client";
export const PRODUCTATTRIBUTES_QUERY = gql`
  query ProductAttibuteList(
    $first: Int
    $skip: Int
    $productAttributeWhereInput: ProductAttributeWhereInput
  ) {
    allProductAttributes(
      first: $first
      skip: $skip
      where: $productAttributeWhereInput
    ) {
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
  productAttributeWhereInput,
}) => {
  const {
    data = {},
    error,
    loading,
  } = useQuery(PRODUCTATTRIBUTES_QUERY, {
    variables: {
      first,
      skip,
      productAttributeWhereInput,
    },
  });
  const { allProductAttributes } = data;
  return (
    <UI
      error={error}
      loading={loading}
      allProductAttributes={allProductAttributes}
    />
  );
};
export default ProductAttributes;
