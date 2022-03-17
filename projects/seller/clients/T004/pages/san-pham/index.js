import React from "react";
import ProductList, {
  PRODUCTS_QUERY,
} from "../../components/primes/Product/List";
import ProductListLak from "../../components/primes/Product/List/Lak";
import { executeServerSide } from "@itoa/ui/UIProvider";
import Breadcrumb from "../../components/elements/Breadcrumb";
import BreadcrumbSimple from "../../components/elements/Breadcrumb/One";
import Sidebar from "../../components/frames/Sidebar";
import SidebarLak from "../../components/frames/Sidebar/Lak";
export default function Categories() {
  return (
    <div>
      <Breadcrumb
        UI={BreadcrumbSimple}
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Danh mục", url: "/san-pham" },
        ]}
      />

      <div className="container" style={{ paddingTop: 54 }}>
        <div className="row">
          <div className={"col-lg-3 col-md-3 col-xs-12 d-none d-md-block"}>
            <Sidebar UI={SidebarLak} />
          </div>
          <div className="col-lg-9 col-md-9 order-1 order-lg-2">
            <ProductList UI={ProductListLak} />
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  return await executeServerSide(context, []);
}
