import { Box, SimpleGrid } from "@chakra-ui/layout";
import { Container, Center } from "@chakra-ui/layout";
import ProductOrderItemSimple from "../Item/Simple";


const ProductOrderListSimple = ({ allProductOrders }) => {
  return (
    <Container maxW={"container.xl"}>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3} mt={8}>
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
