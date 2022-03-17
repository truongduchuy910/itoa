import { gql, makeVar, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const query = gql`
  query ProductAttributeValueList(
    $first: Int
    $skip: Int
    $where: ProductAttributeValueWhereInput
  ) {
    _allProductAttributeValuesMeta(where: $where) {
      count
    }
    allProductAttributeValues(first: $first, skip: $skip, where: $where) {
      id
      value
      file {
        publicUrl
      }
    }
  }
`;

export default function ProductAttributeValueList({
  UI,
  children,
  first = 12,
  skip,
  where,
}) {
  const router = useRouter();
  const { locale } = router;
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allProductAttributeValues = [], _allProductAttributeValuesMeta } =
    data;
  const count = allProductAttributeValues.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allProductAttributeValuesMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allProductAttributeValues: [
            ...previousResult.allProductAttributeValues,
            ...fetchMoreResult.allProductAttributeValues,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allProductAttributeValues={allProductAttributeValues}
        _allProductAttributeValuesMeta={_allProductAttributeValuesMeta}
        clickMore={clickMore}
      />
    ) ||
    children({
      allProductAttributeValues,
      _allProductAttributeValuesMeta,
      clickMore,
    })
  );
}
