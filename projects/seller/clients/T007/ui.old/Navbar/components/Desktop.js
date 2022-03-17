import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  Stack,
  useColorModeValue,
  Text,
  HStack,
  Icon,
  Link,
  PopoverContent,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PostHashtagList from "../../Post/Hashtag/List";
import ProductCategoryList from "../../Product/Category/List";
import Translate from "../../Translate";
import NextLink from "next/link";
import {
  ChevronRightIcon,
  HamburgerIcon,
  DragHandleIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { AiOutlineShop } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
export function getHref(item) {
  switch (item.__typename) {
    case "ProductCategory":
      return `/san-pham/${item.url}`;
    case "PostHashtag":
      return `/bai-viet/${item.url}`;
    case "Post":
      return `/bai-viet/_/${item.url}`;
    default:
      return "#";
  }
}
export default function Desktop({
  posts = [],
  withPinPostHashtag = false,
  withPostHashtag = true,
  withProductCategories = true,
  size = "sm",
  navTextProps,
  headingProps,
}) {
  return (
    <Fragment>
      <Flex display={{ base: "none", md: "flex" }} alignItems="center">
        <ProductCategoryList
          ProductCategoryWhereInput={{ parent_is_null: true }}
          UI={(props) => {
            const { allProductCategories = [] } = props;
            var items = posts.map((post) => ({ ...post, name: post.title }));
            if (withProductCategories)
              items.push({
                name: (
                  <Button
                    leftIcon={<AiOutlineShop />}
                    colorScheme="brand"
                    bg="brand.600"
                    size={size}
                    as={Text}
                  >
                    <Translate content="Sản phẩm" />
                  </Button>
                ),
                prioritize: 5,
                url: "",
                __typename: "ProductCategory",
                children: allProductCategories,
              });

            return (
              <DesktopNav
                navTextProps={navTextProps}
                items={items.sort((a, b) =>
                  a.prioritize < b.prioritize ? 1 : -1
                )}
              />
            );
          }}
        />

        {withPostHashtag && (
          <PostHashtagList
            UI={(props) => {
              const { allPostHashtags = [] } = props;
              const items = [
                {
                  name: (
                    <Button
                      leftIcon={<IoNewspaperOutline />}
                      colorScheme="brand"
                      size="sm"
                      as={Text}
                    >
                      <Translate content="Bài viết" />
                    </Button>
                  ),
                  url: "",
                  __typename: "PostHashtag",
                  children: allPostHashtags,
                },
              ];

              return <DesktopNav navTextProps={navTextProps} items={items} />;
            }}
          />
        )}
        {withPinPostHashtag && (
          <PostHashtagList
            where={{ pin: true }}
            UI={(props) => {
              const { allPostHashtags = [] } = props;
              const items = allPostHashtags;
              return <DesktopNav navTextProps={navTextProps} items={items} />;
            }}
          />
        )}
      </Flex>
    </Fragment>
  );
}

function DesktopNav({ items, navTextProps }) {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  return (
    <Stack direction={"row"} spacing={4} mx={2}>
      {items.map((category, index) => (
        <HStack key={"Box" + category.id + index}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Heading
                {...navTextProps}
                _hover={{
                  textDecoration: "none",
                }}
              >
                <NextLink href={getHref(category)} passHref>
                  <Link textAlign="center">{category.name}</Link>
                </NextLink>
              </Heading>
            </PopoverTrigger>

            {Boolean(category?.children?.length) && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {category.children.map((child, index) => (
                    <NextLink
                      key={"NextLink" + child.id + index}
                      href={getHref(child)}
                      passHref
                    >
                      <Link textAlign="center">
                        <DesktopSubNav key={child.name} {...child} />
                      </Link>
                    </NextLink>
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </HStack>
      ))}
    </Stack>
  );
}

const DesktopSubNav = ({ name, href, as, subLabel }) => {
  return (
    <Box
      p={2}
      rounded={"md"}
      display={"block"}
      role={"group"}
      _hover={{ bg: useColorModeValue("brand.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "brand.400" }}
            fontWeight={500}
          >
            {name}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"brand.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};
