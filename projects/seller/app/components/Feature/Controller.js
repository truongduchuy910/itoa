import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
export const FEATURES_QUERY = gql`
  query Feature(
    $first: Int
    $skip: Int
    $featureWhereInput: FeatureWhereInput
  ) {
    allFeatures(first: $first, skip: $skip, where: $featureWhereInput) {
      id
      name
      image {
        publicUrl
      }
      description
    }
  }
`;
export default function Feature({ UI, first, skip, featureWhereInput }) {
  const router = useRouter();
  const onclickFeature = (feature) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${feature?.post?.url}`
    );
  };
  const {
    loading,
    error,
    data = {},
  } = useQuery(FEATURES_QUERY, {
    variables: {
      first,
      skip,
      featureWhereInput,
    },
  });
  return (
    <UI
      error={error}
      loading={loading}
      allFeatures={data.allFeatures}
      onclickFeature={onclickFeature}
    />
  );
}
