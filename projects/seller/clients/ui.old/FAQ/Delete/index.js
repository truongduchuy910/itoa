import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteFAQ(id: $id) {
      id
      title
      body
      prioritize
    }
  }
`;

export default function FAQDelete({ UI, children, faq }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteFAQ } = data;
  return (
    <UI faq={faq} on={on} deleteFAQ={deleteFAQ} /> ||
    children({ faq, on, deleteFAQ })
  );
}
