import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: UserCreateInput) {
    createUser(data: $data) {
      id
      name
      phone
      email
      isAdmin
      isSeller
    }
  }
`;

export default function UserCreate({ UI, children, user }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createUser } = data;
  return (
    <UI user={user} on={on} createUser={createUser} /> ||
    children({ user, on, createUser })
  );
}
