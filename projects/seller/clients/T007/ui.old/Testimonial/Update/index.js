import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: TestimonialUpdateInput) {
    updateTestimonial(id: $id, data: $data) {
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

export default function TestimonialUpdate({ UI, children, testimonial }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateTestimonial } = data;
  return (
    <UI testimonial={testimonial} on={on} updateTestimonial={updateTestimonial} /> ||
    children({ testimonial, on, updateTestimonial })
  );
}
