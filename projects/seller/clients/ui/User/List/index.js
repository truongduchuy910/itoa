import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query($first: Int, $skip: Int, $where: UserWhereInput) {
    _allUsersMeta(where: $where) {
      count
    }
    allUsers(first: $first, skip: $skip, where: $where) {
      id
      name
      phone
      email
      isAdmin
      isSeller
    }
  }
`;

export default function UserList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allUsers = [], _allUsersMeta } = data;
  const count = allUsers.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allUsersMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        
        return {
          ...previousResult,
          allUsers: [
            ...previousResult.allUsers,
            ...fetchMoreResult.allUsers,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allUsers={allUsers}
        _allUsersMeta={_allUsersMeta}
        clickMore={clickMore}
      />
    ) || children({ allUsers, _allUsersMeta, clickMore })
  );
}
