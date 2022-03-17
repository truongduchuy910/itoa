import { Button } from "@chakra-ui/button";
import { GridItem, Link } from "@chakra-ui/layout";
import { Fragment } from "react";
import ChakSimple from "@itoa/ui/Product/Item/ChakSimple";
import NextLink from "next/link";
import { Box, Center, Divider, Grid } from "@chakra-ui/react";

const ProductSimple = ({
  allProducts,
  _allProductsMeta,
  onClickProduct,
  onClickMore,
}) => {
  return (
    <Fragment>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 2, md: 2 }}
      >
        {allProducts?.map((product, index) => {
          const [category] = product.categories;
          return (
            <GridItem
              key={"GridItem" + product.id + index}
              colSpan={1}
              rowSpan={1}
            >
              <NextLink
                href={`/san-pham/${category.url}/${product.url}`}
                passHref
              >
                <Link>
                  <ChakSimple product={product} />
                </Link>
              </NextLink>
            </GridItem>
          );
        })}
      </Grid>

      {_allProductsMeta.count > allProducts?.length ? (
        <Center my={3}>
          <Button onClick={onClickMore}>Xem thêm</Button>
        </Center>
      ) : null}
    </Fragment>
  );
};
export default ProductSimple;
