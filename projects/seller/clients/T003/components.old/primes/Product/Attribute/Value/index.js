import { gql, useQuery } from '@apollo/client';
import Loading from '../../../../elements/Loading';
export const PRODUCTATTRIBUTEVALUES_QUERY = gql`
  query ($first: Int, $skip: Int, $condition: ProductAttributeValueWhereInput) {
    allProductAttributeValues(first: $first, skip: $skip, where: $condition) {
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
  ProductAttributeValueWhereInput,
}) => {
  const { data, error, loading } = useQuery(PRODUCTATTRIBUTEVALUES_QUERY, {
    variables: { first, skip, condition: ProductAttributeValueWhereInput },
  });

  if (loading || error) return <Loading />;
  const { allProductAttributeValues } = data;
  return <UI allProductAttributeValues={allProductAttributeValues} />;
};
export default ProductAttributes;
