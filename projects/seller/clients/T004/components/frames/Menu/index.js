import { gql, useQuery } from "@apollo/client";
import Loading from "../../elements/Loading";
import { useRouter } from "next/router";
export const MENU_QUERY = gql`
  query ($first: Int, $category: ProductCategoryWhereInput) {
    allProductCategories(first: $first, where: $category) {
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
`;
const Menu = ({ UI, first = 12, ProductCategoryWhereInput }) => {
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

  const onClickHotDeal = (e) => {
    router.push(`/hot-deal`);
  };
  const { data, loading, error } = useQuery(MENU_QUERY, {
    variables: {
      first,
      category: {
        parent_is_null: true,
        ...ProductCategoryWhereInput,
      },
    },
  });
  if (loading || error || !data) return <Loading minHeight={50} />;
  const [page] = data.allPages;
  return (
    <UI
      {...data}
      page={page}
      onClickPostHashtag={onClickPostHashtag}
      onClickAccount={onClickAccount}
      onClickHome={onClickHome}
      onClickWishList={onClickWishList}
      onClickCart={onClickCart}
      onClickHotDeal={onClickHotDeal}
    />
  );
};
export default Menu;
