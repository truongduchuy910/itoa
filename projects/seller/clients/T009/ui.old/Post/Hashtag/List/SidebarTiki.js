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
  Divider,
  useColorModeValue,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Translate from "@itoa/ui/Translate";
import BannerList from "@itoa/ui/Banner/List";
import BannerListSmall from "@itoa/ui/Banner/List/Small";
import Card from "@itoa/ui/Card";
export default function PostHashtagListSidebarTiki({
  allPostHashtags,
  currentUrl,
  title,
  variant,
}) {
  return (
    <Card variant={variant}>
      <Heading
        size="sm"
        textTransform="uppercase"
        mb={4}
        variant="gradient-brand"
      >
        <Translate content={title} />
      </Heading>
      <BannerList UI={BannerListSmall} />

      <SimpleGrid columns={2} gap={2} pt={4}>
        {allPostHashtags?.map((category) => (
          <Item key={category.id} {...category} currentUrl={currentUrl} />
        ))}
      </SimpleGrid>
    </Card>
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
    _postsMeta,
  } = props;
  const { isOpen, onToggle, onOpen } = useDisclosure({
    defaultIsOpen: currentUrl === url,
  });
  const linkHoverColor = useColorModeValue("brand.500", "white");
  return (
    <GridItem role={"group"} rounded={"md"} as="div">
      <Stack spacing={4} onClick={childs && onToggle}>
        {name && (
          <NextLink href={`/bai-viet/${url}`} passHref>
            <Link
              _hover={{ textColor: linkHoverColor }}
              outline="none"
              textTransform="capitalize"
              fontWeight={currentUrl === url ? 900 : 200}
            >
              <Heading size="sm" color="gray.600">
                {name}
              </Heading>
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
                            {child._childsMeta.count + child._postsMeta.count}
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
    </GridItem>
  );
};
