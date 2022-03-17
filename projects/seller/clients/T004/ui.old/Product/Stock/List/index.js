import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query ($first: Int, $skip: Int, $where: ProductStockWhereInput) {
    _allProductStocksMeta(where: $where) {
      count
    }
    allProductStocks(first: $first, skip: $skip, where: $where) {
      id
      quantity
      image {
        publicUrl
      }
    }
  }
`;

export default function ProductStockList({
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
  const { allProductStocks = [], _allProductStocksMeta } = data;
  const count = allProductStocks.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allProductStocksMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allProductStocks: [
            ...previousResult.allProductStocks,
            ...fetchMoreResult.allProductStocks,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allProductStocks={allProductStocks}
        _allProductStocksMeta={_allProductStocksMeta}
        clickMore={clickMore}
      />
    ) || children({ allProductStocks, _allProductStocksMeta, clickMore })
  );
}
