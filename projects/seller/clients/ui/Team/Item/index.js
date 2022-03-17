import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Team(where: { id: $id }) {
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

export default function TeamItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Team: team } = data;
  return <UI team={team} /> || children({ team });
}
