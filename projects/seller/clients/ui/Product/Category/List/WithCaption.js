import { useBreakpointValue } from "@chakra-ui/react";
import {
  Flex,
  SimpleGrid,
  VStack,
  Text,
  Container,
  Box,
} from "@chakra-ui/layout";
import ItemSimple from "../Item/Simple";
export default function WithCaption({ allProductCategories, ServiceLink }) {
  return (
    <SimpleGrid columns={2} spacing={5} py={21}>
      {allProductCategories?.map((category) => {
        return <ItemSimple key={category.id} category={category} />;
      })}
    </SimpleGrid>
  );
}
