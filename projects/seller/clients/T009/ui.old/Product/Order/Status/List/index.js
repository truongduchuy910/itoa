import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query($first: Int, $skip: Int, $where: ProductOrderStatusWhereInput) {
    _allProductOrderStatusesMeta(where: $where) {
      count
    }
    allProductOrderStatuses(first: $first, skip: $skip, where: $where) {
      id
      value
      color
    }
  }
`;

export default function ProductOrderStatusList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allProductOrderStatuses = [], _allProductOrderStatusesMeta } = data;
  const count = allProductOrderStatuses.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allProductOrderStatusesMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        
        return {
          ...previousResult,
          allProductOrderStatuses: [
            ...previousResult.allProductOrderStatuses,
            ...fetchMoreResult.allProductOrderStatuses,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allProductOrderStatuses={allProductOrderStatuses}
        _allProductOrderStatusesMeta={_allProductOrderStatusesMeta}
        clickMore={clickMore}
      />
    ) || children({ allProductOrderStatuses, _allProductOrderStatusesMeta, clickMore })
  );
}
