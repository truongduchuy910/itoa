<<<<<<< HEAD
import { useQuery, gql } from '@apollo/client';
import Loading from '../../../../elements/Loading';
=======
import { useQuery, gql } from "@apollo/client";
import Loading from "../../../../elements/Loading";
>>>>>>> 8e151249fe35c5fd5ec0c04802df8794aff5caa7
export const BRANDS_QUERY = gql`
  query {
    allProductBrands {
      id
      name
    }
  }
`;
const ProductBrands = ({ UI }) => {
  const { loading, error, data } = useQuery(BRANDS_QUERY);
  if (loading || error) return <Loading />;
  const { allProductBrands } = data;
  return <UI allProductBrands={allProductBrands} />;
};
export default ProductBrands;
