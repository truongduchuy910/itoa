import { gql, useQuery } from "@apollo/client";
const TESTIMONIALS_QUERY = gql`
  query TestimonialList(
    $first: Int
    $skip: Int
    $testimonialWhereInput: TestimonialWhereInput
  ) {
    allTestimonials(first: $first, skip: $skip, where: $testimonialWhereInput) {
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
const Testimonial = ({ UI, variant, first, skip, testimonialWhereInput }) => {
  const {
    loading,
    error,
    data = {},
  } = useQuery(TESTIMONIALS_QUERY, {
    variables: {
      first,
      skip,
      testimonialWhereInput,
    },
  });
  const { allTestimonials } = data;
  return (
    <UI
      error={error}
      loading={loading}
      allTestimonials={allTestimonials}
      variant={variant}
    />
  );
};
export default Testimonial;
