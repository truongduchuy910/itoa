import { gql, useQuery } from "@apollo/client";
import Loading from "../../Loading";
import Controller from "./Controller";

export const BANNERS_QUERY = gql`
  query BannerList(
    $first: Int
    $skip: Int
    $bannerWhereInput: BannerWhereInput
  ) {
    allBanners(first: $first, skip: $skip, where: $bannerWhereInput) {
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

export function BannerListController({
  UI,
  first = BANNERS_VARS.first,
  skip = BANNERS_VARS.skip,
  bannerWhereInput,
}) {
  var {
    data = {},
    error,
    loading,
  } = useQuery(BANNERS_QUERY, {
    variables: {
      first,
      skip,
      bannerWhereInput,
    },
  });
  const { allBanners = [] } = data;
  return <UI loading={loading} error={error} allBanners={allBanners} />;
}

export default BannerListController;
