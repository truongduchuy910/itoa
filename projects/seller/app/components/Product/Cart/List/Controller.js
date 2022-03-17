import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query ProductCartList(
    $first: Int
    $skip: Int
    $where: ProductCartWhereInput
  ) {
    _allProductCartsMeta(where: $where) {
      count
    }
    allProductCarts(first: $first, skip: $skip, where: $where) {
      id
      ip
    }
  }
`;

export default function ProductCartList({
  UI,
  children,
  first = 12,
  skip,
  where,
}) {
  var {
    data = {},
    error,
    loading,
    fetchMore,
  } = useQuery(query, {
    variables: { first, skip, where },
  });
  const { allProductCarts = [], _allProductCartsMeta } = data;
  const count = allProductCarts.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allProductCartsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allProductCarts: [
            ...previousResult.allProductCarts,
            ...fetchMoreResult.allProductCarts,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        error={error}
        loading={loading}
        allProductCarts={allProductCarts}
        _allProductCartsMeta={_allProductCartsMeta}
        clickMore={clickMore}
      />
    ) || children({ allProductCarts, _allProductCartsMeta, clickMore })
  );
}
