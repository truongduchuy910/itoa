import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: TestimonialCreateInput) {
    createTestimonial(data: $data) {
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

export default function TestimonialCreate({ UI, children, testimonial }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createTestimonial } = data;
  return (
    <UI testimonial={testimonial} on={on} createTestimonial={createTestimonial} /> ||
    children({ testimonial, on, createTestimonial })
  );
}
