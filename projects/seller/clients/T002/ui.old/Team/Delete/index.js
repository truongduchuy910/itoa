import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteTeam(id: $id) {
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

export default function TeamDelete({ UI, children, team }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteTeam } = data;
  return (
    <UI team={team} on={on} deleteTeam={deleteTeam} /> ||
    children({ team, on, deleteTeam })
  );
}
