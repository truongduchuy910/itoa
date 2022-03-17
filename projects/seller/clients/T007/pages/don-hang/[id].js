import { Container } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import ProductOrderList from "@itoa/ui/Product/Order/List";
import ProductOrderListSimple from "@itoa/ui/Product/Order/List/Simple";
const ProductOrder = () => {
  return (
    <Container maxW="container.xl">
      <ProductOrderList
        UI={ProductOrderListSimple}
        // ProductOrderWhereInput={{ cart: { id: cartId } }}
      />
    </Container>
  );
};
export default ProductOrder;
