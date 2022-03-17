import { useRouter } from "next/router";
import React from "react";
import ProductList from "../../../components/primes/Product/List";
import ProductListLak from "../../../components/primes/Product/List/Lak";
import ProductCategoryList from "../../../components/primes/Product/Category/List";
import ProductCategoryListLak from "../../../components/primes/Product/Category/List/Lak";
import Breadcrumb from "../../../components/elements/Breadcrumb";
import BreadcrumbSimple from "../../../components/elements/Breadcrumb/One";

import SidebarLak from "../../../components/frames/Sidebar/Lak";
import Infomation from "../../../components/frames/Infomation";

import { Container } from "@chakra-ui/react";
import { executeServerSide } from "@itoa/ui/UIProvider";

export default function Categories() {
  const router = useRouter();
  var {
    query: { category: activeUrls, from: FR, to: T },
  } = router;
  if (activeUrls === "undefined") {
    activeUrls = false;
    console.log(router);
  }
  return (
    <div>
      <Breadcrumb
        UI={BreadcrumbSimple}
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Danh mục", url: "/san-pham" },
        ]}
      />
      <Container maxW="container.xl" pt={10} minH={"70vh"}>
        <div className="row">
          <div className={"col-lg-3 col-md-3 col-xs-12 d-none d-md-block"}>
            {activeUrls && (
              <Infomation
                UI={SidebarLak}
                activeUrls={activeUrls}
                FR={FR}
                T={T}
              />
            )}
          </div>
          <div className="col-lg-9 col-md-9 order-1 order-lg-2">
            {activeUrls && (
              <ProductCategoryList
                UI={ProductCategoryListLak}
                first={12}
                ProductCategoryWhereInput={{
                  parent: {
                    url: activeUrls,
                  },
                }}
              />
            )}
            {activeUrls && (
              <ProductList
                UI={ProductListLak}
                ProductCategoryWhereInput={{ url_in: activeUrls }}
                ProductWhereInput={{
                  categories_some: { url_in: activeUrls },
                }}
              />
            )}
          </div>
        </div>
      </Container>
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
