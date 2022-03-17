import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import trans from "@itoa/components/utils/trans";
import { pagePropsVar } from "../UIProvider";

export const INFORMATION_QUERY = gql`
  query Information(
    $first: Int
    $skip: Int
    $productCategoryWhereInput: ProductCategoryWhereInput
    $pageWhereInput: PageWhereInput
    $serviceWhereInput: ServiceWhereInput
    $postHashtagWhereInput: PostHashtagWhereInput
    $featureWhereInput: FeatureWhereInput
    $locale: String
    $domain: String
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
    allServices(where: $serviceWhereInput) {
      id
      name
    }
    allPostHashtags(where: $postHashtagWhereInput) {
      id
      name
      url
    }
    allFeatures(where: $featureWhereInput) {
      id
      name
    }
    allPages(first: 1, where: $pageWhereInput) {
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
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

      company(sortBy: prioritize_DESC) {
        # translate
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        id
        title
        thumbnail {
          publicUrl
        }
        content
        prioritize
        url
      }
    }
    allUsers(first: 1, where: { domain: $domain }) {
      id
    }
  }
`;

function InformationController({
  UI,
  first = 12,
  skip = 0,
  productCategoryWhereInput = { parent_is_null: true },
  pageWhereInput,
  children,
  config,
  pageProps,
}) {
  const router = useRouter();
  const { locale } = router;
  const { domain } = useMemo(pagePropsVar, [pageProps]);
  /**
   * router
   */
  const onClickFeature = (feature) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${feature?.post?.url}`
    );
  };
  const onClickService = (service) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${service?.post?.url}`
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
  var {
    data = {},
    loading,
    error,
  } = useQuery(INFORMATION_QUERY, {
    variables: {
      first,
      skip,
      pageWhereInput,
      productCategoryWhereInput,
      locale,
      domain,
    },
  });
  data = useMemo(() => trans(data), [data]);
  const { allPages = [], allProductCategories = [], allUsers = [] } = data;
  const [user = {}] = allUsers;
  const [page = {}] = allPages;
  return (
    <UI
      error={error}
      loading={loading}
      page={page}
      user={user}
      allProductCategories={allProductCategories}
      children={children}
      config={config}
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
  );
}
export default InformationController;
