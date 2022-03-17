import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql`
  query($first: Int, $skip: Int, $where: ServiceWhereInput) {
    _allServicesMeta(where: $where) {
      count
    }
    allServices(first: $first, skip: $skip, where: $where) {
      id
      name
      image {
        publicUrl
      }
      description
      content
    }
  }
`;

export default function ServiceList({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { allServices = [], _allServicesMeta } = data;
  const count = allServices.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allServicesMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        
        return {
          ...previousResult,
          allServices: [
            ...previousResult.allServices,
            ...fetchMoreResult.allServices,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        allServices={allServices}
        _allServicesMeta={_allServicesMeta}
        clickMore={clickMore}
      />
    ) || children({ allServices, _allServicesMeta, clickMore })
  );
}
