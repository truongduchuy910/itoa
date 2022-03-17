import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
const Menu = ({ UI, skip, first = 12, productCategoryWhereInput }) => {
  const router = useRouter();
  const onClickAccount = () => {
    router.push({ pathname: "/tai-khoan" });
  };
  const onClickHome = () => {
    router.push({ pathname: "/" });
  };
  const onClickWishList = () => {
    router.push({ pathname: "/yeu-thich" });
  };
  const onClickCart = () => {
    router.push({ pathname: "/gio-hang" });
  };
  const onClickPostHashtag = (url) => {
    router.push(`/chu-de/[[...id]]`, `/chu-de/${url}`);
  };

  const {
    data = {},
    loading,
    error,
  } = useQuery(
    gql`
      query Hero(
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
          id
          name
          url
          prioritize
          childs {
            id
            name
            url
            childs {
              id
              name
              url
            }
          }
        }
        authenticatedUser {
          id
          name
          phone
          isAdmin
          isSeller
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
        first,
        skip,
        productCategoryWhereInput,
      },
    }
  );
  const { allPages = [] } = data;
  const [page] = allPages;
  return (
    <UI
      error={error}
      loading={loading}
      {...data}
      page={page}
      onClickPostHashtag={onClickPostHashtag}
      onClickAccount={onClickAccount}
      onClickHome={onClickHome}
      onClickWishList={onClickWishList}
      onClickCart={onClickCart}
    />
  );
};
export default Menu;
