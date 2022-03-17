import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: TeamUpdateInput) {
    updateTeam(id: $id, data: $data) {
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

export default function TeamUpdate({ UI, children, team }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateTeam } = data;
  return (
    <UI team={team} on={on} updateTeam={updateTeam} /> ||
    children({ team, on, updateTeam })
  );
}
