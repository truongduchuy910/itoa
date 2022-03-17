import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
export const PRODUCT_CATEGORIES_QUERY = gql`
  query ProductCategoryList(
    $first: Int
    $skip: Int
    $productCategoryWhereInput: ProductCategoryWhereInput
  ) {
    allProductCategories(
      first: $first
      skip: $skip
      where: $productCategoryWhereInput
    ) {
      name
      url
      id
      prioritize
      file {
        publicUrl
      }
      childs {
        name
        url
        id
        childs {
          name
          url
          id
        }
      }
    }
  }
`;
const ProductCategories = ({
  first = 12,
  skip = 0,
  productCategoryWhereInput,
  UI,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  var {
    data = {},
    error,
    loading,
  } = useQuery(PRODUCT_CATEGORIES_QUERY, {
    variables: {
      first: open ? 99 : first,
      skip,
      productCategoryWhereInput,
    },
  });
  const {
    query: { id: activeUrls },
  } = router;

  const categories = data?.allProductCategories?.slice()?.sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  const Render = UI ? UI : Default;
  return (
    <Render
      error={error}
      loading={loading}
      allProductCategories={categories}
      activeUrls={activeUrls}
      open={open}
      setOpen={setOpen}
    />
  );
};
export default ProductCategories;
