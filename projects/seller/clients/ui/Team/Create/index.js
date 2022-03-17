import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: TeamCreateInput) {
    createTeam(data: $data) {
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

export default function TeamCreate({ UI, children, team }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createTeam } = data;
  return (
    <UI team={team} on={on} createTeam={createTeam} /> ||
    children({ team, on, createTeam })
  );
}
