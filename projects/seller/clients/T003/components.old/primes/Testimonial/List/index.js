import { gql, useQuery } from '@apollo/client';
import Loading from '../../../elements/Loading';
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
const Testimonial = ({ UI, variant }) => {
  const { loading, error, data } = useQuery(TESTIMONIALS_QUERY);
  if (loading || error) return <Loading variant={{ height: 400 }} />;
  const { allTestimonials } = data;
  return <UI allTestimonials={allTestimonials} variant={variant} />;
};
export default Testimonial;
