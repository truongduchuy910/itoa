import { Fragment } from "react";
import Auth from "../../../components/primes/User/Auth";
import Breadcrumb from "../../../components/elements/Breadcrumb";
const Authentication = () => {
  return (
    <Fragment>
      <Breadcrumb
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Tài khoản", url: "/gio-hang" },
          { name: "Đăng nhập", url: "/gio-hang" },
        ]}
      />
      <Auth option={`Lak`} />
    </Fragment>
  );
};
export default Authentication;
