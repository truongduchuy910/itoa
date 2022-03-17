import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ContactUpdateInput) {
    updateContact(id: $id, data: $data) {
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

export default function ContactUpdate({ UI, children, contact }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateContact } = data;
  return (
    <UI contact={contact} on={on} updateContact={updateContact} /> ||
    children({ contact, on, updateContact })
  );
}
