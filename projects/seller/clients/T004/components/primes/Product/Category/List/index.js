import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loading from "../../../../elements/Loading";
import { useMemo, useState } from "react";
export const PRODUCT_CATEGORIES_QUERY = gql`
  query($first: Int, $skip: Int, $condition: ProductCategoryWhereInput) {
    allProductCategories(first: $first, skip: $skip, where: $condition) {
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
  first = 7,
  skip = 0,
  ProductCategoryWhereInput,
  UI,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  var { data, error, loading } = useQuery(PRODUCT_CATEGORIES_QUERY, {
    variables: {
      first: open ? 99 : first,
      skip,
      condition: ProductCategoryWhereInput,
    },
  });
  if (loading || error)
    return <Loading style={{ marginTop: 13, marginBottom: 13 }} />;
  const {
    query: { id: activeUrls },
  } = router;

  const categories = data?.allProductCategories?.slice()?.sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  const Render = UI ? UI : Default;
  return (
    <Render
      allProductCategories={categories}
      activeUrls={activeUrls}
      open={open}
      setOpen={setOpen}
    />
  );
};
export default ProductCategories;
