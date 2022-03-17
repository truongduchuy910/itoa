import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      phone
      email
      isAdmin
      isSeller
    }
  }
`;

export default function UserDelete({ UI, children, user }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteUser } = data;
  return (
    <UI user={user} on={on} deleteUser={deleteUser} /> ||
    children({ user, on, deleteUser })
  );
}
