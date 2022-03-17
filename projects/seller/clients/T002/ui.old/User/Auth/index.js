import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query {
    authenticatedUser {
      id
      name
      phone
      email
      isAdmin
      isSeller
      avatar {
        publicUrl
      }
    }
  }
`;

export default function UserAuth({ id, UI, children }) {
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  console.log(data)
  const { authenticatedUser: user } = data;
  return <UI user={user} /> || children({ user });
}
