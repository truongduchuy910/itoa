import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
export const BANNERS_QUERY = gql`
  query {
    allBanners {
      id
      name
      description
      image {
        publicUrl
      }
    }
  }
`;
export const BANNERS_VARS = { first: 12, skip: 0 };
export default function BannerList({
  UI,
  first = BANNERS_VARS.first,
  skip = BANNERS_VARS.skip,
  BannerWhereInput,
}) {
  var {
    data = {},
    error,
    loading,
  } = useQuery(BANNERS_QUERY, {
    variables: { first, skip, condition: BannerWhereInput },
  });

  const { allBanners = [] } = data;
  return useMemo(() => <UI allBanners={allBanners} />, [UI.name, allBanners]);
}
