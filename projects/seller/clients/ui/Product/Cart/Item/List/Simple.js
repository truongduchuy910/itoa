import ProductCartItemItemSimple from "../Item/Simple";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Translate from "../../../../Translate";
const ProductCartItemListSimple = ({
  readOnly,
  allProductCartItems = [],
  refetch,
  loading,
}) => {
  return (
    <SimpleGrid>
      {allProductCartItems.map((item) => {
        return (
          <Box key={item.id}>
            <ProductCartItemItemSimple
              productCartItem={item}
              readOnly={readOnly}
            />
          </Box>
        );
      })}
      {!loading && !allProductCartItems?.length && (
        <Translate
          as={Text}
          fontStyle="italic"
          color="gray.500"
          content="Không có kết quả"
        />
      )}
    </SimpleGrid>
  );
};
export default ProductCartItemListSimple;
