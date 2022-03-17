import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query ($first: Int, $skip: Int, $where: CommentWhereInput) {
    _allCommentsMeta(where: $where) {
      count
    }
    allComments(first: $first, skip: $skip, where: $where) {
      id
      content
      replies {
        id
        content
      }
    }
  }
`;
export const CommentListRefetch = makeVar(() => {});

export default function CommentList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore, refetch } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allComments = [], _allCommentsMeta } = data;
  const count = allComments.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allCommentsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allComments: [
            ...previousResult.allComments,
            ...fetchMoreResult.allComments,
          ],
        };
      },
    });
  }
  if (refetch) CommentListRefetch(refetch);
  return (
    (
      <UI
        allComments={allComments}
        _allCommentsMeta={_allCommentsMeta}
        clickMore={clickMore}
      />
    ) || children({ allComments, _allCommentsMeta, clickMore })
  );
}
