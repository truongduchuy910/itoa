import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
const Menu = ({ UI, first = 12, skip, productCategoryWhereInput }) => {
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
      query Navbar(
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
        allServices {
          id
          name
          post {
            url
          }
        }
        allPostHashtags {
          id
          name
          url
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
        productCategoryWhereInput,
        skip,
      },
    }
  );
  const { allPages = [] } = data;
  const [page] = allPages;
  return (
    <UI
      {...data}
      error={error}
      loading={loading}
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
