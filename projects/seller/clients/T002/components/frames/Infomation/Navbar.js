import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import { useEffect, useRef } from "react";

export default function Navbar({
  page,
  allPostHashtags,
  allProductCategories,
  // router
  onClickPostHashtag = (hashtag) => {},
  onClickProductCategory = (category) => {},
  onClickHome = (e) => {},
  onClickSearch = (e) => {},
  clickCheckout = (e) => {},
  action,
}) {
  const btnRefCart = useRef();
  const { isOpen, onToggle } = useDisclosure();
  // const {
  //   isOpen: isOpenCart,
  //   onOpen: onOpenCart,
  //   onClose: onCloseCart,
  // } = useDisclosure();
  // useEffect(() => {
  //   if (onOpenCart) onOpenCartVar(onOpenCart);
  //   if (onCloseCart) onCloseCartVar(onCloseCart);
  // });
  return (
    <Box
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
      width={"full"}
      borderStyle={"solid"}
      boxShadow={"lg"}
      bg={useColorModeValue("white", "gray.900")}
    >
      <Container maxW={"container.xl"}>
        <Flex minH={"60px"} w={"full"} py={{ base: 2 }} align={"center"}>
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} rounded="md" />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link
              textAlign={{ base: "center", md: "left" }}
              fontFamily={"heading"}
              onClick={() => {
                onClickHome();
              }}
              width={50}
              height={50}
            >
              <Image
                src={page.logo?.publicUrl.replace(/\/md/g, "/sm")}
                height={50}
                width={50}
                layout="responsive"
                objectFit="contain"
              />
              {/* {page.store} */}
            </Link>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav
                allPostHashtags={allPostHashtags}
                allProductCategories={allProductCategories}
                onClickPostHashtag={onClickPostHashtag}
                onClickProductCategory={onClickProductCategory}
              />
            </Flex>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={2}
          >
            <IconButton
              icon={<SearchIcon />}
              fontSize={"lg"}
              onClick={onClickSearch}
              rounded="md"
            />
            {action}
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav
            allPostHashtags={allPostHashtags}
            allProductCategories={allProductCategories}
            onClickPostHashtag={onClickPostHashtag}
            onClickProductCategory={onClickProductCategory}
          />
        </Collapse>
      </Container>

      {/* <Drawer
        isOpen={isOpenCart}
        placement="right"
        onClose={onCloseCart}
        finalFocusRef={btnRefCart}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Giỏ hàng của bạn</DrawerHeader>
            <DrawerBody>
              <ProductCartItem
                UI={({ ProductCart, refetch }) => {
                  return (
                    <ProductCartItemListSimple
                      allProductCartItems={ProductCart.items}
                      refetch
                    />
                  );
                }}
              />
            </DrawerBody>
            <DrawerFooter>
              <Button
                w={"full"}
                colorScheme={"yellow"}
                bg={"brand.500"}
                onClick={(e) => {
                  clickCheckout();
                  onCloseCart();
                }}
              >
                Thanh toán
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer> */}
    </Box>
  );
}

const DesktopNav = ({
  allPostHashtags,
  allProductCategories,
  onClickPostHashtag,
  onClickProductCategory,
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      <Popover trigger={"hover"} placement={"bottom-start"}>
        <PopoverTrigger>
          <Link
            p={2}
            fontSize={"sm"}
            fontWeight={500}
            _hover={{
              textDecoration: "none",
            }}
          >
            Sản phẩm
          </Link>
        </PopoverTrigger>
        {allProductCategories && (
          <PopoverContent
            border={0}
            boxShadow={"xl"}
            p={4}
            rounded={"xl"}
            minW={"sm"}
          >
            <Stack>
              {allProductCategories.map((category) => (
                <DesktopSubNav
                  key={category.name}
                  {...category}
                  onClick={(e) => {
                    onClickProductCategory(category);
                  }}
                />
              ))}
            </Stack>
          </PopoverContent>
        )}
      </Popover>
      {/*  */}
      {allPostHashtags?.length ? (
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Link
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              _hover={{
                textDecoration: "none",
              }}
            >
              Bài viết
            </Link>
          </PopoverTrigger>
          {allPostHashtags && (
            <PopoverContent
              border={0}
              boxShadow={"xl"}
              p={4}
              rounded={"xl"}
              minW={"sm"}
            >
              <Stack>
                {allPostHashtags.map((hashtag) => (
                  <DesktopSubNav
                    key={hashtag.name}
                    {...hashtag}
                    onClick={(e) => {
                      onClickPostHashtag(hashtag);
                    }}
                  />
                ))}
              </Stack>
            </PopoverContent>
          )}
        </Popover>
      ) : null}
    </Stack>
  );
};

const DesktopSubNav = ({ name, onClick = (e) => {} }) => {
  return (
    <Link
      onClick={onClick}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "brand.500" }}
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
          {/* <Text fontSize={"sm"}>{name}</Text> */}
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
          <Icon color={"brand.500"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({
  allPostHashtags,
  allProductCategories,
  onClickPostHashtag,
  onClickProductCategory,
}) => {
  return (
    <Stack p={4} display={{ md: "none" }}>
      <MobileNavItem
        items={allProductCategories}
        name={"Sản phẩm"}
        onClickItem={onClickProductCategory}
      />
      {allPostHashtags?.length ? (
        <MobileNavItem
          items={allPostHashtags}
          name={"Bài viết"}
          onClickItem={onClickPostHashtag}
        />
      ) : null}
    </Stack>
  );
};

const MobileNavItem = ({ items = [], name, onClickItem = (item) => {} }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={items?.length ? onToggle : (e) => {}}>
      <Flex
        py={2}
        as={Link}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{name}</Text>
        {items?.length ? (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        ) : null}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={"brand.700"}
          align={"start"}
        >
          {items?.length &&
            items.map((item) => (
              <Link
                key={item.id}
                py={2}
                onClick={(e) => {
                  onClickItem(item);
                }}
              >
                {item.name}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
