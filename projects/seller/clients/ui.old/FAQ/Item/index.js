import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    FAQ(where: { id: $id }) {
      id
      title
      body
      prioritize
    }
  }
`;

export default function FAQItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { FAQ: faq } = data;
  return <UI faq={faq} /> || children({ faq });
}
