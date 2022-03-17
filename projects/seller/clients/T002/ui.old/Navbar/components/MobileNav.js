import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Collapse,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
  Link,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import Translate from "@itoa/ui/Translate";
import NextLink from "next/link";
export default function Mobile({
  isOpen,

  withProductCategories = true,
  posts = [],
}) {
  return (
    <Fragment>
      <Collapse in={isOpen} animateOpacity>
        <ProductCategoryList
          ProductCategoryWhereInput={{ parent_is_null: true }}
          UI={(props) => {
            const { allProductCategories = [] } = props;
            var items = posts.map((post) => ({ ...post, name: post.title }));
            if (withProductCategories)
              items.push({
                name: <Translate content="Sản phẩm" />,
                url: "",
                __typename: "ProductCategory",
                children: allProductCategories,
              });
            return <MobileNav items={items} />;
          }}
        />
        {/* <PostHashtagList
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
        /> */}
      </Collapse>
    </Fragment>
  );
}
const MobileNav = ({ items }) => {
  return (
    <Stack p={4} display={{ md: "none" }}>
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
        <Text fontWeight={600} color="white">
          <NextLink
            href={
              `/${
                __typename === "PostHashtag" ? "bai-viet" : "san-pham"
              }/${url}` ?? "#"
            }
            passHref
          >
            <Link color="white">{name}</Link>
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
                <Link py={2} color="white">
                  {child.name}
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
