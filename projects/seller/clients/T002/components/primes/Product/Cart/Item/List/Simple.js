import ProductCartItemItemSimple from "../Item/Simple";
import ProductCartItem from "../../Item";
import { Box, SimpleGrid } from "@chakra-ui/react";
const ProductCartItemListSimple = ({
  readOnly,
  allProductCartItems = [],
  refetch,
}) => {
  return (
    <SimpleGrid>
      {allProductCartItems.map((item) => {
        return (
          <Box key={item.id}>
            <ProductCartItemItemSimple productCartItem={item} readOnly={readOnly} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
export default ProductCartItemListSimple;
