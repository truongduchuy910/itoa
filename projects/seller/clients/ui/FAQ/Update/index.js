import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: FAQUpdateInput) {
    updateFAQ(id: $id, data: $data) {
      id
      title
      body
      prioritize
    }
  }
`;

export default function FAQUpdate({ UI, children, faq }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateFAQ } = data;
  return (
    <UI faq={faq} on={on} updateFAQ={updateFAQ} /> ||
    children({ faq, on, updateFAQ })
  );
}
