import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import trans from "@itoa/ui/utils/trans";
import { useMemo } from "react";
export const PageListQuery = gql`
  query ($locale: String) {
    allPages {
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

      company {
        id
        title
        thumbnail {
          publicUrl
        }
        content
      }
    }
  }
`;

export default function PageList(props) {
  const { UI = {}, children } = props;
  const router = useRouter();
  const { locale } = router;

  const result = useQuery(PageListQuery, {
    variables: { locale },
    notifyOnNetworkStatusChange: true,
  });
  var { error, loading, variables, called, networkStatus, data = {} } = result;
  data = useMemo(() => trans(data), [variables, loading, locale]);
  var {
    allPages = [],
    _allPagesMeta = {},
    allProductCategories = [],
    allPostHashtags = [],
  } = data;

  var [page = {}] = allPages;
  return (
    <UI
      {...props}
      {...result}
      allPages={allPages}
      _allPagesMeta={_allPagesMeta}
      page={page}
      allProductCategories={allProductCategories}
      allPostHashtags={allPostHashtags}
    >
      {children}
    </UI>
  );
}
