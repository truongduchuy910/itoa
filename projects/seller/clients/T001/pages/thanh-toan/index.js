import { Container } from "@chakra-ui/react";
import { Fragment } from "react";
// import ProductCartItem from "../../components/primes/Product/Cart/Item";
// import ProductCartItemCheckout from "../../components/primes/Product/Cart/Item/Checkout";
import dynamic from "next/dynamic";
const ProductOrderCreate = dynamic(
  () => import("@itoa/ui/Product/Order/Create"),
  { ssr: false },
);
const ProductOrderCreateSimple = dynamic(
  () => import("@itoa/ui/Product/Order/Create/Simple"),
  { ssr: false },
);
const Account = () => {
  return (
    <Container maxW="container.xl">
      {/* <ProductCartItem UI={ProductCartItemCheckout} /> */}
      <ProductOrderCreate UI={ProductOrderCreateSimple} />
    </Container>
  );
};
export default Account;
