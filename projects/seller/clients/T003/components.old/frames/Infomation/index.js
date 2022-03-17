import { gql, makeVar, useQuery } from "@apollo/client";
import Loading from "../../elements/Loading";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
export const INFORMATION_QUERY = gql`
  query ($first: Int, $category: ProductCategoryWhereInput) {
    allProductCategories(first: $first, where: $category) {
      name
      url
      id
      prioritize
      file {
        publicUrl
      }
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
    allFeatures {
      id
      name
      post {
        url
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
      twitter
      pinterest
      youtube
      facebook
      embed
      pageId
      gtag
      domain
      transfer
      ship
    }
  }
`;
export const INFORMATION_VARS = {
  first: 12,
  category: { parent_is_null: true },
};
const Menu = ({
  UI,
  first = INFORMATION_VARS.first,
  ProductCategoryWhereInput = INFORMATION_VARS.category,
}) => {
  const router = useRouter();
  /**
   * router
   */
  const onClickFeature = (feature) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${feature?.post?.url}`,
    );
  };
  const onClickService = (service) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${service?.post?.url}`,
    );
  };
  const onClickAccount = (e) => {
    router.push({ pathname: "/tai-khoan" });
  };
  const onClickHome = (e) => {
    router.push({ pathname: "/" });
  };
  const onClickWishList = (e) => {
    router.push({ pathname: "/yeu-thich" });
  };
  const onClickCart = (e) => {
    router.push({ pathname: "/gio-hang" });
  };
  const onClickSearch = (e) => {
    router.push({ pathname: "/tim-kiem" });
  };
  const clickCheckout = (e) => {
    router.push({ pathname: "/thanh-toan" });
  };
  const onClickPostHashtag = (hashtag) => {
    if (hashtag.length) {
      router.push(`/bai-viet/[hashtag]`, `/bai-viet/chu-de/${hashtag[0].url}`, {
        scroll: true,
      });
    } else if (hashtag && hashtag.url) {
      router.push(`/bai-viet/[hashtag]`, `/bai-viet/${hashtag.url}`);
    }
  };
  const onClickProductCategory = (category) => {
    if (category)
      router.push(`/san-pham/[category]`, `/san-pham/${category.url}`, {});
  };
  const onClickHotDeal = (e) => {
    router.push(`/hot-deal`);
  };

  /**
   *
   */
  const { data, loading, error, previousData } = useQuery(INFORMATION_QUERY, {
    variables: {
      first,
      category: ProductCategoryWhereInput,
    },
  });
  if (loading || error)
    return <Loading variant={{ height: 67 }} error={error} />;
  const {
    allProductCategories,
    allServices,
    allPostHashtags,
    allFeatures,
    allPages,
  } = data;
  const [page] = allPages || previousData;
  return (
    <Fragment>
      <Head>
        <title>
          {page.store} | {page.slogan}
        </title>
        <link rel="icon" href={page.logo?.publicUrl} type="image/jpg"></link>
        <meta name="description" content={page.intro} />
      </Head>
      <UI
        allProductCategories={allProductCategories}
        allServices={allServices}
        allPostHashtags={allPostHashtags}
        allFeatures={allFeatures}
        page={page}
        allPages={allPages}
        onClickProductCategory={onClickProductCategory}
        onClickPostHashtag={onClickPostHashtag}
        onClickAccount={onClickAccount}
        onClickHome={onClickHome}
        onClickWishList={onClickWishList}
        onClickCart={onClickCart}
        onClickFeature={onClickFeature}
        onClickService={onClickService}
        onClickSearch={onClickSearch}
        clickCheckout={clickCheckout}
        onClickHotDeal={onClickHotDeal}
      />
    </Fragment>
  );
};
export default Menu;
