import { Button } from "@chakra-ui/button";
import { GridItem } from "@chakra-ui/layout";
import { Center, SimpleGrid } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Fragment } from "react";
import ProductItemLabel from "../Item/Label";
const ProductSimple = ({
  allProducts,
  _allProductsMeta,
  clickMore,
  itemUI: ItemUI = ProductItemLabel,
}) => {
  return (
    <Fragment>
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3} py={4}>
        {allProducts?.map((product) => {
          return (
            <GridItem key={product.id} colSpan={1} rowSpan={1}>
              <ItemUI product={product} />
            </GridItem>
          );
        })}
      </SimpleGrid>
      {_allProductsMeta.count > allProducts?.length ? (
        <Center>
          <Button
            leftIcon={<ArrowDownIcon />}
            onClick={clickMore}
            colorScheme="brand"
            my={34}
            mx="auto"
            size="sm"
            variant="outline"
          >
            Xem thêm
          </Button>
        </Center>
      ) : null}
    </Fragment>
  );
};
export default ProductSimple;
