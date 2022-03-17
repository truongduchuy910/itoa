import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query FAQList($first: Int, $skip: Int, $where: FAQWhereInput) {
    _allFAQSMeta(where: $where) {
      count
    }
    allFAQS(first: $first, skip: $skip, where: $where) {
      id
      title
      body
      prioritize
    }
  }
`;

export default function FAQList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allFAQS = [], _allFAQSMeta } = data;
  const count = allFAQS.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allFAQSMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allFAQS: [...previousResult.allFAQS, ...fetchMoreResult.allFAQS],
        };
      },
    });
  }

  return (
    (
      <UI allFAQS={allFAQS} _allFAQSMeta={_allFAQSMeta} clickMore={clickMore} />
    ) || children({ allFAQS, _allFAQSMeta, clickMore })
  );
}
