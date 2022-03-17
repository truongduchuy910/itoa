import { useRouter } from 'next/router';
import ProductItem from '../.././../components/primes/Product/Item/index';
import ProductItemSimple from '../../../components/primes/Product/Item/Simple';

const Product = () => {
  const router = useRouter();
  const {
    query: { product: url },
  } = router;
  return <ProductItem UI={ProductItemSimple} ProductWhereInput={{ url }} />;
};
export default Product;
