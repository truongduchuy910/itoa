import { gql, useQuery } from "@apollo/client";
import { Container } from "@chakra-ui/react";
import { Fragment } from "react";
import Breadcrumb from "../../components/elements/Breadcrumb";
import BreadcrumbOne from "../../components/elements/Breadcrumb/One";
import ProductCart from "../../components/primes/Product/Cart";
import ProductCartLak from "../../components/primes/Product/Cart/Lak";
const Account = () => {
  return (
    <Fragment>
      <Breadcrumb
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Giỏ hàng", url: "/gio-hang" },
        ]}
        UI={BreadcrumbOne}
      />
      <Container maxW="container.xl" minH="70vh">
        <ProductCart UI={ProductCartLak} />
      </Container>
    </Fragment>
  );
};
export default Account;
