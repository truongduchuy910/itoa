import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: UserUpdateInput) {
    updateUser(id: $id, data: $data) {
      id
      name
      phone
      email
      isAdmin
      isSeller
    }
  }
`;

export default function UserUpdate({ UI, children, user }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateUser } = data;
  return (
    <UI user={user} on={on} updateUser={updateUser} /> ||
    children({ user, on, updateUser })
  );
}
