import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query ProductHashtagList(
    $first: Int
    $skip: Int
    $where: ProductHashtagWhereInput
  ) {
    _allProductHashtagsMeta(where: $where) {
      count
    }
    allProductHashtags(first: $first, skip: $skip, where: $where) {
      id
      name
      url
    }
  }
`;

export default function ProductHashtagList({
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
  const { allProductHashtags = [], _allProductHashtagsMeta } = data;
  const count = allProductHashtags.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allProductHashtagsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allProductHashtags: [
            ...previousResult.allProductHashtags,
            ...fetchMoreResult.allProductHashtags,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allProductHashtags={allProductHashtags}
        _allProductHashtagsMeta={_allProductHashtagsMeta}
        clickMore={clickMore}
      />
    ) || children({ allProductHashtags, _allProductHashtagsMeta, clickMore })
  );
}
