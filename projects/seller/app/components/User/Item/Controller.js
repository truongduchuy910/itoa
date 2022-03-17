import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query($id: ID!) {
    User(where: { id: $id }) {
      id
      name
      phone
      email
      isAdmin
      isSeller
    }
  }
`;

export default function UserItem({ id, UI, children }) {
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { User: user } = data;
  return <UI user={user} /> || children({ user });
}
