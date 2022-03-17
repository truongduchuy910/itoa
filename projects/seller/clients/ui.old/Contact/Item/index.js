import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Contact(where: { id: $id }) {
      id
      phone
      name
      address
      email
      message
      isDefault
    }
  }
`;

export default function ContactItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Contact: contact } = data;
  return <UI contact={contact} /> || children({ contact });
}
