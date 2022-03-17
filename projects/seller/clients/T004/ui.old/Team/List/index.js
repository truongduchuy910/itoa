import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query($first: Int, $skip: Int, $where: TeamWhereInput) {
    _allTeamsMeta(where: $where) {
      count
    }
    allTeams(first: $first, skip: $skip, where: $where) {
      id
      name
      avatar {
        publicUrl
      }
      position
      summary
      work
      skill
      experience
      academic
      professional
      soft
      contact
    }
  }
`;

export default function TeamList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allTeams = [], _allTeamsMeta } = data;
  const count = allTeams.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allTeamsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        
        return {
          ...previousResult,
          allTeams: [
            ...previousResult.allTeams,
            ...fetchMoreResult.allTeams,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allTeams={allTeams}
        _allTeamsMeta={_allTeamsMeta}
        clickMore={clickMore}
      />
    ) || children({ allTeams, _allTeamsMeta, clickMore })
  );
}
