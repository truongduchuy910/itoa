import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query ContactList($first: Int, $skip: Int, $where: ContactWhereInput) {
    _allContactsMeta(where: $where) {
      count
    }
    allContacts(first: $first, skip: $skip, where: $where) {
      id
      phone
      name
      address
      email
      message
      isDefault
    }
  }
`;

export default function ContactList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allContacts = [], _allContactsMeta } = data;
  const count = allContacts.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allContactsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allContacts: [
            ...previousResult.allContacts,
            ...fetchMoreResult.allContacts,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allContacts={allContacts}
        _allContactsMeta={_allContactsMeta}
        clickMore={clickMore}
      />
    ) || children({ allContacts, _allContactsMeta, clickMore })
  );
}
