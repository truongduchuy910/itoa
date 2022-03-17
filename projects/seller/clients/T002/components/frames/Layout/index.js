import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Fragment } from "react";
const ToastSimple = dynamic(() => import("../../elements/Toast/Simple"));
const Infomation = dynamic(() => import("../../frames/Infomation"));
const InfomationNavbar = dynamic(() =>
  import("../../frames/Infomation/Navbar"),
);
const InformationFooter = dynamic(() =>
  import("../../frames/Infomation/Footer"),
);
const ProductCartItem = dynamic(
  () => import("../../primes/Product/Cart/Item"),
  { ssr: false },
);
const ProductCartItemListDrawer = dynamic(
  () => import("../../primes/Product/Cart/Item/List/Drawer"),
  { ssr: false },
);

const Layout = ({ children }) => {
  return useMemo(() => (
    <Fragment>
      <Infomation
        UI={InfomationNavbar}
        action={
          <ProductCartItem
            UI={(props) => {
              const { ProductCart } = props;
              return (
                <ProductCartItemListDrawer
                  {...props}
                  allProductCartItems={ProductCart.items}
                />
              );
            }}
          />
        }
      />
      {children}
      <Infomation UI={InformationFooter} />
      <ToastSimple />
    </Fragment>
  ));
};
export default Layout;
