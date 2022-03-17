import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Container, Center } from "@chakra-ui/layout";
import ProductOrderItemSimple from "../Item/Simple";
import ProductList from "../../List";
// import ProductListLak from "../../List/Lak";
import ProductListLak from "../../List/Simple";
import Title from "../../../../elements/Title";
import TitleLak from "../../../../elements/Title/Lak";

const ProductOrderListSimple = ({ allProductOrders }) => {
  return (
    <Container maxW={"container.xl"}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3} mt={8}>
        {allProductOrders?.map((order) => {
          return (
            <Box key={order.id}>
              <Center>
                <ProductOrderItemSimple key={order.id} {...order} />
              </Center>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};
export default ProductOrderListSimple;
