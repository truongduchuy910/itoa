import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../../elements/Loading";

const Sidebar = ({
  UI,
  first = 12,
  skip = 0,
  ProductCategoryWhereInput,
  choosedItem,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  var { data, error, loading } = useQuery(
    gql`
<<<<<<< HEAD
      query ($first: Int, $skip: Int, $category: ProductCategoryWhereInput) {
=======
      query($first: Int, $skip: Int, $category: ProductCategoryWhereInput) {
>>>>>>> 8e151249fe35c5fd5ec0c04802df8794aff5caa7
        allProductCategories(first: $first, skip: $skip, where: $category) {
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
        allPages {
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
          prices
          facebook
          domain
          transfer
          ship
          user {
            id
          }
        }
      }
    `,
    {
      variables: {
        first: open ? 99 : first,
        skip,
        category: {
          ...ProductCategoryWhereInput,
          parent_is_null: true,
        },
      },
    }
  );

  if (loading || error)
    return <Loading style={{ marginTop: 13, marginBottom: 13 }} />;
  const [page] = data.allPages;
  const {
    query: { id: activeUrls },
  } = router;
  var prices = page?.prices
    ? page?.prices.split(",").map((e) => Number(e))
    : [100000, 200000, 300000, 400000, 500000];

  var prices = [0, ...prices];
  const onClickProductCategory = (category) => {
    router.push(`/san-pham/[danh-muc]`, `/san-pham/${category.url}`);
  };
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
      allProductCategories={categories}
      activeUrls={activeUrls}
      onClickItem={(url) => choosedItem(url)}
      open={open}
      setOpen={setOpen}
      onClickProductCategory={onClickProductCategory}
      prices={prices}
      onClickPrice={onClickPrice}
      onClickAllPrice={onClickAllPrice}
    />
  );
};
export default Sidebar;
