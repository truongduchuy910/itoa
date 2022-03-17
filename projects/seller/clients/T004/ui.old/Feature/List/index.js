import { gql, makeVar, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import trans from "@itoa/ui/utils/trans";

export const query = gql`
  query ($locale: String, $first: Int, $skip: Int, $where: FeatureWhereInput) {
    _allFeaturesMeta(where: $where) {
      count
    }
    allFeatures(first: $first, skip: $skip, where: $where) {
      # translate
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
      id
      name
      image {
        publicUrl
      }
      description
      content
    }
  }
`;

export default function FeatureList({
  UI,
  children,
  first = 12,
  skip,
  where,
  my,
  onCompleted = () => {},
  ...props
}) {
  const { locale } = useRouter();
  var { data, error, loading, fetchMore, variables } = useQuery(query, {
    variables: { first, skip, where, locale },
    onCompleted: onCompleted,
  });
  data = useMemo(() => trans(data), [loading, variables, locale]);
  if (loading) return "...";
  if (error) return error.message;
  const { allFeatures = [], _allFeaturesMeta } = data;
  const count = allFeatures.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allFeaturesMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allFeatures: [
            ...previousResult.allFeatures,
            ...fetchMoreResult.allFeatures,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        {...props}
        allFeatures={allFeatures}
        _allFeaturesMeta={_allFeaturesMeta}
        clickMore={clickMore}
        my={my}
      />
    ) || children({ allFeatures, _allFeaturesMeta, clickMore })
  );
}
