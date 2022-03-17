import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductSidebar = ({
  firstCategories = 7,
  firstBrands = 7,
  skipCategories,
  skipBrands,
  UI,
  category,
  brand,
  onClickProductBrand = (brand) => {},
  onClickProductCategory = (category) => {},
}) => {
  const router = useRouter();
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenBrand, setIsOpenBrand] = useState(false);

  const {
    loading,
    error,
    data = {},
    previousData,
  } = useQuery(
    gql`
      query ProductSideBar(
        $firstCategories: Int
        $firstBrands: Int
        $skipBrands: Int
        $skipCategories: Int
        $productCategoryWhereInput: ProductCategoryWhereInput
        $productBrandWhereInput: ProductBrandWhereInput
      ) {
        allProductCategories(
          first: $firstCategories
          skip: $skipCategories
          where: $productCategoryWhereInput
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
        allProductBrands(
          first: $firstBrands
          skip: $skipBrands
          where: $productBrandWhereInput
        ) {
          id
          name
        }
      }
    `,
    {
      variables: {
        firstCategories: isOpenCategory ? 100 : firstCategories,
        firstBrands: isOpenBrand ? 100 : firstBrands,
        skipCategories,
        skipBrands,
        category,
        brand,
      },
    }
  );
  const toggleCategory = (e) => {
    if (!loading) setIsOpenCategory((category) => !category);
  };
  const toggleBrand = (e) => {
    if (!loading) setIsOpenBrand((brand) => !brand);
  };

  return (
    <UI
      {...(data || previousData)}
      error={error}
      loading={loading}
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
