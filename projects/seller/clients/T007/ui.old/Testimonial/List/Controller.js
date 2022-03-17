import { gql, useQuery } from "@apollo/client";
export const TESTIMONIALS_QUERY = gql`
  query ($first: Int) {
    allTestimonials(first: $first) {
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
export default function TestimonialList({ UI, first = 3, ...props }) {
  const {
    loading,
    error,
    data = {},
    refetch,
  } = useQuery(TESTIMONIALS_QUERY, { variables: { first } });
  const { allTestimonials = [] } = data;
  return (
    <UI
      {...props}
      loading={loading}
      error={error}
      allTestimonials={allTestimonials}
      refetch={refetch}
    />
  );
}
