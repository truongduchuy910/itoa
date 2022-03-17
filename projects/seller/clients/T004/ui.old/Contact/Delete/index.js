import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteContact(id: $id) {
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

export default function ContactDelete({ UI, children, contact }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteContact } = data;
  return (
    <UI contact={contact} on={on} deleteContact={deleteContact} /> ||
    children({ contact, on, deleteContact })
  );
}
