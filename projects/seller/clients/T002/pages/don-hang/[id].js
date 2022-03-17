import { Container } from "@chakra-ui/layout";
import { cartId } from "../../components/primes/Product/Cart/Item";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { makeVar, useReactiveVar } from "@apollo/client";
import { Skeleton } from "@chakra-ui/react";
const ProductOrderList = dynamic(
  () => import("../../components/primes/Product/Order/List"),
  { ssr: false },
);
const ProductOrderListSimple = dynamic(
  () => import("../../components/primes/Product/Order/List/Simple"),
  { ssr: false },
);
const test = makeVar(0);
const ProductOrder = () => {
  const id = useReactiveVar(cartId);

  const productOrder = useMemo(
    () =>
      id ? (
        <ProductOrderList
          UI={ProductOrderListSimple}
          ProductOrderWhereInput={{ cart: { id } }}
        />
      ) : (
        <Skeleton height={300} />
      ),
    [id],
  );

  return <Container maxW="container.xl">{id && productOrder}</Container>;
};
export default ProductOrder;
