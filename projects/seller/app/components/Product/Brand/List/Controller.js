import { useQuery, gql } from "@apollo/client";
export const BRANDS_QUERY = gql`
  query ProductBrand(
    $first: Int
    $skip: Int
    $productBrandWhereInput: ProductBrandWhereInput
  ) {
    allProductBrands(
      first: $first
      skip: $skip
      where: $productBrandWhereInput
    ) {
      id
      name
    }
  }
`;
const ProductBrands = ({ UI, first, skip, productBrandWhereInput }) => {
  const {
    loading,
    error,
    data = {},
  } = useQuery(BRANDS_QUERY, {
    variables: {
      first,
      skip,
      productBrandWhereInput,
    },
  });
  const { allProductBrands } = data;
  return (
    <UI error={error} loading={loading} allProductBrands={allProductBrands} />
  );
};
export default ProductBrands;
