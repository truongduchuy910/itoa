import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($data: FAQCreateInput) {
    createFAQ(data: $data) {
      id
      title
      body
      prioritize
    }
  }
`;

export default function FAQCreate({ UI, children, faq }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createFAQ } = data;
  return (
    <UI faq={faq} on={on} createFAQ={createFAQ} /> ||
    children({ faq, on, createFAQ })
  );
}
