import { gql, useQuery } from "@apollo/client";
const TESTIMONIALS_QUERY = gql`
  query {
    allTestimonials {
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
export default function TestimonialList({ UI, ...props }) {
  const { loading, error, data = {} } = useQuery(TESTIMONIALS_QUERY);
  const { allTestimonials = [] } = data;
  return <UI {...props} allTestimonials={allTestimonials} />;
}
