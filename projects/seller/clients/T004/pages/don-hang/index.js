import { useReactiveVar } from "@apollo/client";
import { cartId } from "../../components/primes/Product/Cart";
import ProductOrderList from "../../components/primes/Product/Order/List";
import ProductOrderListSimple from "../../components/primes/Product/Order/List/Simple";

const ProductOrder = () => {
  const id = useReactiveVar(cartId);
  return id ? (
    <ProductOrderList
      UI={ProductOrderListSimple}
      ProductOrderWhereInput={{ cart: { id } }}
    />
  ) : (
    ""
  );
};
export default ProductOrder;
