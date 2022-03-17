import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query ProductDiscountList(
    $first: Int
    $skip: Int
    $where: ProductDiscountWhereInput
  ) {
    _allProductDiscountsMeta(where: $where) {
      count
    }
    allProductDiscounts(first: $first, skip: $skip, where: $where) {
      id
      code
      type
      value
      name
      description
      condition
      image {
        publicUrl
      }
      url
    }
  }
`;

export default function ProductDiscountList({
  UI,
  children,
  first = 12,
  skip,
  where,
}) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allProductDiscounts = [], _allProductDiscountsMeta } = data;
  const count = allProductDiscounts.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allProductDiscountsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allProductDiscounts: [
            ...previousResult.allProductDiscounts,
            ...fetchMoreResult.allProductDiscounts,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allProductDiscounts={allProductDiscounts}
        _allProductDiscountsMeta={_allProductDiscountsMeta}
        clickMore={clickMore}
      />
    ) || children({ allProductDiscounts, _allProductDiscountsMeta, clickMore })
  );
}
