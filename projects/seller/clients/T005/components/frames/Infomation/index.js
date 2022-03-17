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
    }
    allPostHashtags {
      id
      name
      url
    }
    allFeatures {
      id
      name
    }
    allPages {
      id
      logo {
        publicUrl
      }
      _bannersMeta {
        count
      }
      banners {
        id
        name
        slogan
        image {
          publicUrl
        }
        description
        url
      }
      store
      slogan
      address
      intro
      phone
      email
      contact

      color
      colorMode
      twitter
      instagram
      pinterest
      youtube
      googlePlus
      googleMap
      zalo

      transfer
      shipMoneySupport
      ship
      pageId
      pixelId
      gtag
      blocks
    }
  }
`;
export const INFORMATION_VARS = {
  first: 7,
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
  const [page = {}] = data.allPages;
  return (
    <Fragment>
      <Head>
        <title>
          {page.store} | {page.slogan}
        </title>
        <link
          rel="icon"
          href={page.logo?.publicUrl.replace(/\/md/g, "/sm") || "/assets/img/no-image.png"}
          type="image/jpg"
        ></link>
        <meta name="description" content={page.intro} />
      </Head>
      <UI
        {...(data || previousData)}
        page={page}
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
