import { Container, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import ProductList from "@itoa/ui/Product/List";
import ProductListSimple from "@itoa/ui/Product/List/Simple";
import CategoryProductListSimple from "@itoa/ui/Product/Category/Product/List";
// import ProductList, { PRODUCTS_QUERY } from '../../../components/primes/Product/List';
// import ProductListLak from '../../../components/primes/Product/List/Lak';
// import ProductCategoryList, {
//   PRODUCT_CATEGORIES_QUERY,
// } from '../../../components/primes/Product/Category/List';
// import ProductCategoryListLak from '../../../components/primes/Product/Category/List/Lak';
// import Breadcrumb from '../../../components/elements/Breadcrumb';
// import BreadcrumbSimple from '../../../components/elements/Breadcrumb/One';
// import Sidebar from '../../../components/frames/Sidebar';
// import SidebarLak from '../../../components/frames/Sidebar/Lak';
// import Infomation from '../../../components/frames/Infomation';
// import { addApolloState, initializeApollo } from '../../../components/state/apollo';
export default function Categories() {
  const router = useRouter();
  const {
    query: { category },
  } = router;
  // console.log(router);
  return (
    <main>
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" isTruncated colorScheme="brand" pt={21}>
          ProductListSimple
        </Heading>
      <CategoryProductListSimple category={{ url: category }}>
          {({ productCategory, clickMore }) => {
            const { products, _productsMeta } = productCategory;
            return (
              <ProductListSimple
                allProducts={products}
                _allProductsMeta={_productsMeta}
                clickMore={clickMore}
              />
            );
          }}
        </CategoryProductListSimple>
      {/* <ProductList
          UI={ProductListSimple}
          first={8}
          where={{ categories_some: { url: category } }}
        /> */}
      {/* <Breadcrumb
        UI={BreadcrumbSimple}
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Danh mục', url: '/san-pham' },
        ]}
      />

      <div className="container" style={{ paddingTop: 54 }}>
        <div className="row">
          <div className={'col-lg-3 col-md-3 col-xs-12 d-none d-md-block'}>
            <Infomation UI={SidebarLak} activeUrls={activeUrls} FR={FR} T={T} />
          </div>
          <div className="col-lg-9 col-md-9 order-1 order-lg-2">
            <ProductCategoryList
              UI={ProductCategoryListLak}
              first={12}
              choosedItem={item => onClickProductCategory(item)}
              ProductCategoryWhereInput={{
                parent: {
                  url: activeUrls,
                },
              }}
            />
            <ProductList
              UI={ProductListLak}
              ProductWhereInput={{
                categories_some: { url_in: activeUrls },
                price_gt: from || 0,
                price_lt: to || 9999999,
              }}
            />
          </div>
        </div>
      </div> */}
      </Container>
    </main>
  );
}

// export async function getServerSideProps(context) {
//   const {
//     query: { category: activeUrls, from: FR, to: T },
//   } = context;
//   const from = Number(FR);
//   const to = Number(T);
//   const { host } = context.req.headers;
//   const apolloClient = initializeApollo(null, host);

//   await apolloClient.query({
//     query: PRODUCT_CATEGORIES_QUERY,
//     variables: {
//       first: 12,
//       skip: 0,
//       condition: {
//         parent: {
//           url: activeUrls,
//         },
//       },
//     },
//   });
//   await apolloClient.query({
//     query: PRODUCTS_QUERY,
//     variables: {
//       first: 8,
//       skip: 0,
//       condition: {
//         categories_some: { url_in: activeUrls },
//         price_gt: from || 0,
//         price_lt: to || 9999999,
//       },
//     },
//   });
//   return addApolloState(
//     apolloClient,
//     {
//       props: {},
//     },
//     host
//   );
// }
