import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../../elements/Loading";
export const SIDEBAR = gql`
  query (
    $firstCategories: Int
    $firstBrands: Int
    $category: ProductCategoryWhereInput
  ) {
    allProductCategories(
      first: $firstCategories
      where: $category
      sortBy: prioritize_DESC
    ) {
      id
      name
      url
      prioritize
      childs {
        id
        prioritize
        name
        url
      }
    }
    allProductBrands(first: $firstBrands) {
      id
      name
    }
  }
`;
const ProductSidebar = ({
  firstCategories = 7,
  firstBrands = 7,
  UI,
  category,
  brand,
  onClickProductBrand = (brand) => {},
  onClickProductCategory = (category) => {},
}) => {
  const router = useRouter();
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenBrand, setIsOpenBrand] = useState(false);

  const { loading, error, data, previousData } = useQuery(SIDEBAR, {
    variables: {
      firstCategories: isOpenCategory ? 100 : firstCategories,
      firstBrands: isOpenBrand ? 100 : firstBrands,
      category: { parent_is_null: true },
    },
  });
  if ((loading || error) && !previousData)
    return <Loading error={error} variant={{ height: 836 }} />;
  /**
   * event handle
   */
  const toggleCategory = (e) => {
    if (!loading) setIsOpenCategory((category) => !category);
  };
  const toggleBrand = (e) => {
    if (!loading) setIsOpenBrand((brand) => !brand);
  };

  return (
    <UI
      {...(data || previousData)}
      toggleCategory={toggleCategory}
      toggleBrand={toggleBrand}
      brand={brand}
      category={category}
      onClickProductBrand={onClickProductBrand}
      onClickProductCategory={onClickProductCategory}
    />
  );
};
export default ProductSidebar;
