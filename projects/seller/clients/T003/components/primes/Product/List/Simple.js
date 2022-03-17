import { Button } from "@chakra-ui/button";
import { GridItem } from "@chakra-ui/layout";
import { Fragment } from "react";
import ChakSimple from "../Item/ChakSimple";
const ProductSimple = ({
  allProducts,
  _allProductsMeta,
  onClickProduct,
  onClickMore,
}) => {
  return (
    <Fragment>
      {allProducts?.map((product) => {
        return (
          <GridItem key={product.id} colSpan={1} rowSpan={1}>
            <ChakSimple
              product={product}
              onClick={(e) => {
                onClickProduct(product);
              }}
            />
          </GridItem>
        );
      })}
      {_allProductsMeta.count > allProducts?.length ? (
        <Button onClick={onClickMore}>Xem thêm</Button>
      ) : null}
    </Fragment>
  );
};
export default ProductSimple;
