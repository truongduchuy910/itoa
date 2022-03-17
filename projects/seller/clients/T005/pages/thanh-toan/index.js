import { Fragment } from "react";
import Breadcrumb from "../../components/elements/Breadcrumb";
import BreadcrumbOne from "../../components/elements/Breadcrumb/One";
import ProductCart from "../../components/primes/Product/Cart";
import ProductCartCheckout from "../../components/primes/Product/Cart/Checkout";
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
      <div className="container">
        <ProductCart UI={ProductCartCheckout} />
      </div>
    </Fragment>
  );
};
export default Account;
