import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Testimonial(where: { id: $id }) {
      id
      name
      profile
      description
      image {
        publicUrl
      }
    }
  }
`;

export default function TestimonialItem({ id = "", UI, children }) {
  if (!id) return "id required";
  const {
    loading,
    error,
    data = {},
    refetch,
  } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Testimonial: testimonial } = data;
  return <UI testimonial={testimonial} /> || children({ testimonial });
}
