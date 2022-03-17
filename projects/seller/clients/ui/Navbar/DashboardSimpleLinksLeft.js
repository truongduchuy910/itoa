import React, { Fragment, useEffect } from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  Avatar,
  Container,
  InputRightElement,
  InputRightAddon,
  useBreakpointValue,
} from "@chakra-ui/react";
import Mobile from "./components/MobileNav";
// import { Logo } from "@choc-ui/logo";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import LogoBrandH from "../Logo/BrandH";
import Desktop from "./components/Desktop";
import Translate from "../Translate";
import TranslateIcon from "../Translate/Icon";
import dynamic from "next/dynamic";
const ProductCartItem = dynamic(() => import("@itoa/ui/Product/Cart/Item"), {
  ssr: false,
});

import ProductCartItemListIconWithBadge from "@itoa/ui/Product/Cart/Item/List/IconWithBadge";
import trans from "@itoa/ui/Translate/trans";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Search from "@itoa/ui/Search";
import { useRouter } from "next/router";

const ProductCartItemListDrawer = dynamic(
  () => import("@itoa/ui/Product/Cart/Item/List/Drawer"),
  {
    ssr: false,
  },
);
const SearchModal = dynamic(() => import("@itoa/ui/Search/Modal"), {
  ssr: false,
});
export default function DashboardSimpleLinksLeft({
  action = "",
  page,
  allProductCategories,
  allPostHashtags,
}) {
  const bg = "brand.500";
  const mobileNav = useDisclosure();
  const searchText = trans("Tìm kiếm");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const {
    isOpen: isOC,
    onToggle: toggleCart,
    onClose: closeCart,
  } = useDisclosure();
  const {
    isOpen: isOS,
    onOpen: openSearch,
    onClose: closeSearch,
  } = useDisclosure();
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      closeSearch();
      onClose();
      closeCart();
    });
  });
  return (
    <React.Fragment>
      {openSearch && (
        <Search isOpen={isOS} onClose={closeSearch} UI={SearchModal} />
      )}

      <chakra.header
        bg={bg}
        w="full"
        shadow="lg"
        borderBottom={1}
        pos="sticky"
        zIndex="sticky"
        top={0}
      >
        <Container maxW="container.xl">
          <Flex alignItems="center" justifyContent="space-between">
            <HStack display="flex" alignItems="center">
              <Box display={{ base: "inline-flex", md: "none" }}>
                <IconButton
                  colorScheme="brand"
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
              </Box>
              <chakra.a
                href="/"
                title="Home Page"
                display="flex"
                alignItems="center"
              >
                {/* <Logo /> */}
                <VisuallyHidden>Choc</VisuallyHidden>
              </chakra.a>

              <HStack
                spacing={3}
                display={{ base: "none", md: "inline-flex" }}
                py={1}
              >
                <LogoBrandH
                  src={page?.logo?.publicUrl || "/upload/no-image"}
                  name={page.store}
                  textColor="white"
                  w={70}
                />
                <Desktop />
              </HStack>
            </HStack>
            <HStack
              display={mobileNav.isOpen ? "none" : "flex"}
              alignItems="center"
              py={2}
            >
              <InputGroup
                size="sm"
                colorScheme="brand"
                rounded="md"
                onClick={(e) => openSearch()}
              >
                <Input
                  // type="tel"
                  placeholder={searchText + "..."}
                  // pr="4.5rem"
                  rounded="md"
                  isDisabled={isOS}
                  borderColor="brand.500"
                  bg="white"
                  shadow="lg"
                />

                <InputRightAddon
                  shadow="lg"
                  borderColor="brand.500"
                  as={Button}
                  bg="brand.500"
                  color="white"
                  colorScheme="brand"
                  leftIcon={<AiOutlineSearch />}
                  rounded="md"
                  children={searchText}
                  hidden={{ xs: true, md: false }}
                />
                <InputRightAddon
                  as={IconButton}
                  shadow="lg"
                  borderColor="brand.500"
                  bg="brand.600"
                  color="white"
                  colorScheme="brand"
                  icon={<AiOutlineSearch />}
                  rounded="md"
                ></InputRightAddon>
              </InputGroup>

              <Box
                // p={3}
                color={useColorModeValue("gray.800", "inherit")}
                rounded="sm"
                _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
              >
                {/* <AiFillBell /> */}
                <Translate UI={TranslateIcon} color="white" />
                <VisuallyHidden>
                  <Translate content="Dịch" />
                </VisuallyHidden>
              </Box>

              <ProductCartItem
                UI={({ ProductCart, ...props }) => {
                  return (
                    <ProductCartItemListDrawer
                      toggleButton={ProductCartItemListIconWithBadge}
                      _allProductCartItemsMeta={ProductCart?._itemsMeta}
                      allProductCartItems={ProductCart.items}
                      {...props}
                    />
                  );
                }}
              />
              {/* <Avatar
                size="sm"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              /> */}
            </HStack>
          </Flex>
          <Mobile isOpen={isOpen} />
        </Container>
      </chakra.header>
    </React.Fragment>
  );
}
