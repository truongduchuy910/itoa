import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Container,
  Link,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import NextLink from "next/link";
import LogoBrandH from "../Logo/BrandH";
import Translate from "../Translate";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
export default function WithSubnavigation({
  action = "",
  page,
  allProductCategories,
  allPostHashtags,
}) {
  const { productCategories = [], postHashtags = [] } = page;
  var items = [];
  if (allProductCategories.length)
    items.push({
      name: <Translate content="Sản phẩm" />,
      url: "",
      __typename: "ProductCategory",
      children: [...allProductCategories],
    });
  if (allPostHashtags.length)
    items.push({
      name: <Translate content="Bài viết" />,
      url: "",
      __typename: "PostHashtag",
      children: [...allPostHashtags],
    });
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box pos="sticky" top={0} minH={12} zIndex="popover">
      <Box minH={"60px"}>
        <Box
          zIndex="docked"
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
        >
          <Container maxW="container.xl">
            <Flex minH={"60px"} py={{ base: 2 }} align={"center"}>
              <Flex
                flex={{ base: 1 }}
                justify={{ base: "start", md: "start" }}
                alignItems="center"
              >
                <LogoBrandH
                  src={page?.logo?.publicUrl || "/no-image"}
                  name={page.store}
                  w={50}
                />
                <Flex
                  display={{ base: "none", md: "flex" }}
                  ml={10}
                  alignItems="center"
                >
                  <ProductCategoryList
                    UI={(props) => {
                      const { allProductCategories = [] } = props;
                      return (
                        <DesktopNav
                          items={[
                            {
                              name: <Translate content="Sản phẩm" />,
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
                              name: <Translate content="Bài viết" />,
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
              </Flex>

              <Stack justify={"flex-end"} direction={"row"}>
                <IconButton
                  onClick={onToggle}
                  icon={
                    isOpen ? (
                      <CloseIcon w={3} h={3} />
                    ) : (
                      <HamburgerIcon w={5} h={5} />
                    )
                  }
                  display={{ md: "none" }}
                  isRound
                />
                {action({ page })}
              </Stack>
            </Flex>
          </Container>
          <Collapse in={isOpen} animateOpacity>
            <ProductCategoryList
              UI={(props) => {
                const { allProductCategories = [] } = props;
                return (
                  <MobileNav
                    items={[
                      {
                        name: <Translate content="Sản phẩm" />,
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
                  <MobileNav
                    items={[
                      {
                        name: <Translate content="Bài viết" />,
                        url: "",
                        __typename: "PostHashtag",
                        children: allPostHashtags,
                      },
                    ]}
                  />
                );
              }}
            />
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}

const DesktopNav = ({ items }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} mx={4}>
      {items.map((category, index) => (
        <Box key={"Box" + category.id + index}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Text
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
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
              </Text>
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
};

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

const MobileNav = ({ items }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {items.map((category, index) => (
        <MobileNavItem
          key={"MobileNavItem" + category.id + index}
          {...category}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ name, children, url, as, __typename }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          <NextLink
            href={
              `/${
                __typename === "PostHashtag" ? "bai-viet" : "san-pham"
              }/${url}` ?? "#"
            }
            passHref
          >
            <Link>{name}</Link>
          </NextLink>
        </Text>
        {Boolean(children?.length) && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child, index) => (
              <NextLink
                key={"NextLinkChild" + child.index + index}
                href={`/${
                  child.__typename === "PostHashtag" ? "bai-viet" : "san-pham"
                }/${child.url}`}
                passHref
              >
                <Link py={2}>{child.name}</Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
