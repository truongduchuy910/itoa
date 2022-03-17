import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar = ({
  UI,
  first = 12,
  skip = 0,
  productCategoryWhereInput,
  choosedItem,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  var {
    data = {},
    error,
    loading,
  } = useQuery(
    gql`
      query Sidebar(
        $first: Int
        $skip: Int
        $productCategoryWhereInput: ProductCategoryWhereInput
        $pageWhereInput: PageWhereInput
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
        allPages(where: $pageWhereInput) {
          id
          logo {
            publicUrl
          }
          store
          slogan
          address
          intro
          phone
          email
          contact
          transfer
          ship
        }
      }
    `,
    {
      variables: {
        first: open ? 99 : first,
        skip,
        productCategoryWhereInput,
      },
    }
  );
  const { allPages = [] } = data;
  const [page] = allPages;
  const {
    query: { id: activeUrls },
  } = router;
  var prices = page?.prices
    ? page?.prices.split(",").map((e) => Number(e))
    : [100000, 200000, 300000, 400000, 500000];

  var prices = [0, ...prices];

  const onClickPrice = ({ prices, index }) => {
    router.push({
      query: {
        ...router.query,
        from: prices[index],
        to: prices[index + 1] || 9999999,
      },
    });
  };
  const onClickAllPrice = () => {
    var removePrice = router.query;
    delete removePrice.from;
    delete removePrice.to;
    router.push({
      query: {
        ...removePrice,
      },
    });
  };
  const categories = data?.allProductCategories?.slice()?.sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  return (
    <UI
      error={error}
      loading={loading}
      allProductCategories={categories}
      activeUrls={activeUrls}
      onClickItem={(url) => choosedItem(url)}
      open={open}
      setOpen={setOpen}
      prices={prices}
      onClickPrice={onClickPrice}
      onClickAllPrice={onClickAllPrice}
    />
  );
};
export default Sidebar;
