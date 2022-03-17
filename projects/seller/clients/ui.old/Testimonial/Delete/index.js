import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteTestimonial(id: $id) {
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

export default function TestimonialDelete({ UI, children, testimonial }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteTestimonial } = data;
  return (
    <UI testimonial={testimonial} on={on} deleteTestimonial={deleteTestimonial} /> ||
    children({ testimonial, on, deleteTestimonial })
  );
}
