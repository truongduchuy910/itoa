import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  List,
  ListItem,
  Stack,
  useDisclosure,
  Text,
  Icon,
  Link,
  Heading,
  Badge,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Translate from "@itoa/ui/Translate";
export default function ProductCategoryListTikiSidebar({
  allProductCategories,
  currentUrl,
  ...props
}) {
  return (
    <Box {...props} borderWidth={1} p={3} rounded="md" shadow="md">
      <Heading size="sm" mb={3} textTransform="uppercase">
        <Translate content="Danh mục" />
      </Heading>
      <List>
        {allProductCategories?.map((category) => (
          <Item key={category.id} {...category} currentUrl={currentUrl} />
        ))}
      </List>
    </Box>
  );
}

const Item = (props) => {
  const {
    prefix,
    url,
    name,
    childs,
    currentUrl = "",
    _childsMeta,
    _productsMeta,
  } = props;
  const { isOpen, onToggle, onOpen } = useDisclosure({
    defaultIsOpen: currentUrl === url,
  });

  return (
    <ListItem role={"group"} rounded={"md"} as="div">
      <Stack spacing={2} onClick={childs && onToggle}>
        <Flex
          py={1}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          {name && (
            <NextLink href={`/san-pham/${url}`} passHref>
              <Link
                outline="none"
                textTransform="capitalize"
                fontWeight={currentUrl === url ? 900 : 200}
                fontSize="xs"
              >
                <Badge
                  variant="outline"
                  colorScheme="brand"
                  w={8}
                  h="full"
                  textAlign="center"
                  mr={3}
                >
                  {_childsMeta.count + _productsMeta.count}
                </Badge>{" "}
                {name}
              </Link>
            </NextLink>
          )}
          {childs?.length ? (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          ) : null}
        </Flex>

        {childs?.length ? (
          <Collapse
            in={isOpen || childs.find((c) => c.url === currentUrl)}
            animateOpacity
          >
            <List
              mb={5}
              pl={4}
              borderColor="brand.200"
              borderLeft={2}
              borderStyle={"solid"}
              align={"start"}
            >
              {childs &&
                childs.map((child, index) => {
                  return (
                    <ListItem as="div" key={index}>
                      <NextLink href={`/san-pham/${child.url}`} passHref>
                        <Link
                          fontWeight={currentUrl === child.url ? 900 : 200}
                          py={2}
                          textTransform="capitalize"
                          fontSize="xs"
                        >
                          <Badge
                            variant="outline"
                            colorScheme="brand"
                            w={8}
                            textAlign="center"
                            mr={3}
                          >
                            {child._childsMeta.count +
                              child._productsMeta.count}
                          </Badge>{" "}
                          {child.name}
                        </Link>
                      </NextLink>
                    </ListItem>
                  );
                })}
            </List>
          </Collapse>
        ) : null}
      </Stack>
    </ListItem>
  );
};
