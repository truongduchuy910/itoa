import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  Stack,
  useColorModeValue,
  Text,
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
export default function Desktop() {
  return (
    <Fragment>
      <Flex display={{ base: "none", md: "flex" }} ml={10} alignItems="center">
        <ProductCategoryList
          UI={(props) => {
            const { allProductCategories = [] } = props;
            return (
              <DesktopNav
                items={[
                  {
                    name: (
                      <Button
                        leftIcon={<AiOutlineShop />}
                        colorScheme="brand"
                        bg="brand.600"
                        size="sm"
                        as={Text}
                      >
                        <Translate content="Sản phẩm" />
                      </Button>
                    ),
                    url: "",
                    __typename: "ProductCategory",
                    children: allProductCategories,
                  },
                ]}
              />
            );
          }}
        />
        <PostHashtagList
          UI={(props) => {
            const { allPostHashtags = [] } = props;
            return (
              <DesktopNav
                items={[
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
                ]}
              />
            );
          }}
        />
      </Flex>
    </Fragment>
  );
}
function DesktopNav({ items }) {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("brand.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} mx={2}>
      {items.map((category, index) => (
        <Box key={"Box" + category.id + index}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Heading
                fontSize={"sm"}
                fontWeight={500}
                color={"white"}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                <NextLink
                  href={
                    `/${
                      category.__typename === "PostHashtag"
                        ? "bai-viet"
                        : "san-pham"
                    }/${category.url}` ?? "#"
                  }
                  passHref
                >
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
                      href={`/${
                        child.__typename === "PostHashtag"
                          ? "bai-viet"
                          : "san-pham"
                      }/${child.url}`}
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
        </Box>
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
