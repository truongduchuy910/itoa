import { Container, Heading } from "@chakra-ui/react";
import ProductList from "@itoa/ui/Product/List";
import ProductListSquare from "@itoa/ui/Product/List/Square";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import ProductCategoryListSimpeSquare from "@itoa/ui/Product/Category/List/SimpleSquare";
export default function SanPham() {
  return (
    <Container maxW="container.xl">
      <ProductCategoryList UI={ProductCategoryListSimpeSquare} />
      <Heading py="lg">Hot Deal</Heading>
      <ProductList
        UI={ProductListSquare}
        first={1}
        ProductWhereInput={{ status: "hotDeal" }}
      />
      <Heading>Best Seller</Heading>
      <ProductList
        UI={ProductListSquare}
        first={1}
        ProductWhereInput={{ status: "bestSeller" }}
      />
      <Heading>New Arrive</Heading>
      <ProductList
        UI={ProductListSquare}
        first={1}
        ProductWhereInput={{ status: "newArrival" }}
      />
    </Container>
  );
}
