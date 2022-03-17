import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($data: ContactCreateInput) {
    createContact(data: $data) {
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

export default function ContactCreate({ UI, children, contact }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createContact } = data;
  return (
    <UI contact={contact} on={on} createContact={createContact} /> ||
    children({ contact, on, createContact })
  );
}
