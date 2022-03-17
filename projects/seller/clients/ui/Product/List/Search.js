import {
  GridItem,
  Text,
  SimpleGrid,
  chakra,
  Badge,
  Flex,
  Spacer,
  Box,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { AiOutlineShop } from "react-icons/ai";
import NextLink from "next/link";
import Field from "@itoa/ui/Field";
import Translate from "@itoa/ui/Translate";
function Item({ product }) {
  const { categories = [] } = product;
  const [category] = categories;
  return (
    <GridItem as={LinkBox}>
      <Flex>
        <Box>
          <AiOutlineShop style={{ display: "inline-block", marginLeft: -3 }} />
          <Translate
            as={Text}
            mx={2}
            display="inline-block"
            color="gray.600"
            fontSize="xs"
            fontStyle="italic"
            content="Sản phẩm"
          />
          <Text fontSize="xs" display="inline-block">
            {category.name}
          </Text>
          <NextLink href={`/san-pham/${category.url}/${product.url}`} passHref>
            <LinkOverlay>
              <Heading size="xs" variant="gradient-brand">
                {product.name}
              </Heading>
            </LinkOverlay>
          </NextLink>
        </Box>
        <Spacer />

        <Box>
          <Badge mr={2} variant="subtle" size="sm">
            <Field>{product.price}</Field>
          </Badge>
        </Box>
      </Flex>
    </GridItem>
  );
}
export default function ProductListSearch({ allProducts }) {
  return (
    <SimpleGrid gap={1} pb={4}>
      {allProducts?.map((product) => (
        <Item product={product} />
      ))}
    </SimpleGrid>
  );
}
