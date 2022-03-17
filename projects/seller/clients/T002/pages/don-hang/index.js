import { useRouter } from 'next/router';
import ProductOrderList from '../../components/primes/Product/Order/List';
import ProductOrderListSimple from '../../components/primes/Product/Order/List/Simple';
const ProductOrder = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <ProductOrderList UI={ProductOrderListSimple} ProductOrderWhereInput={{ cart: { id: id } }} />
  );
};
export default ProductOrder;
