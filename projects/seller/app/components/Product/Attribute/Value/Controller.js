import { gql, useQuery } from "@apollo/client";
export const PRODUCTATTRIBUTEVALUES_QUERY = gql`
  query ProductAttributeValue(
    $first: Int
    $skip: Int
    $productAttributeValueWhereInput: ProductAttributeValueWhereInput
  ) {
    allProductAttributeValues(
      first: $first
      skip: $skip
      where: $productAttributeValueWhereInput
    ) {
      id
      value
      file {
        publicUrl
      }
    }
  }
`;
export const PRODUCTATTRIBUTEVALUES_VARS = { first: 7, skip: 0 };
const ProductAttributes = ({
  UI,
  first = PRODUCTATTRIBUTEVALUES_VARS.first,
  skip = PRODUCTATTRIBUTEVALUES_VARS.skip,
  productAttributeValueWhereInput,
}) => {
  const {
    data = {},
    error,
    loading,
  } = useQuery(PRODUCTATTRIBUTEVALUES_QUERY, {
    variables: {
      first,
      skip,
      productAttributeValueWhereInput,
    },
  });

  const { allProductAttributeValues } = data;
  return (
    <UI
      error={error}
      loading={loading}
      allProductAttributeValues={allProductAttributeValues}
    />
  );
};
export default ProductAttributes;
