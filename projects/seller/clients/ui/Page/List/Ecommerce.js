import React, { Fragment, useEffect } from "react";

import {
  Box,
  Spacer,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  InputGroup,
  Heading,
  Input,
  Container,
  Text,
  useBreakpointValue,
  Circle,
  InputRightAddon,
  SimpleGrid,
  GridItem,
  Center,
} from "@chakra-ui/react";
import Mobile from "@itoa/ui/Navbar/components/MobileNav";
import { AiOutlineSearch } from "react-icons/ai";
import LogoBrandH from "@itoa/ui/Logo/BrandH";
import Desktop from "@itoa/ui/Navbar/components/Desktop";
import Translate from "@itoa/ui/Translate";
import TranslateIcon from "@itoa/ui/Translate/Icon";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import trans from "@itoa/ui/Translate/trans";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Search from "@itoa/ui/Search";
import { useRouter } from "next/router";
import ProductCategoryList from "../../Product/Category/List";
import ProductCategoryListWithImage from "../../Product/Category/List/WithImage";
import BannerList from "@itoa/ui/Banner/List";
import Image from "next/image";
import Card from "../../Card";
import PageItemSocial from "../Item/Social";
const SearchModal = dynamic(() => import("@itoa/ui/Search/Modal"), {
  ssr: false,
});
export default function PageListEcommerce({
  action = "",
  page,
  allProductCategories,
  allPostHashtags,
  bgGradient,
  bg,
}) {
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
  const { company: posts } = page;
  return (
    <Fragment>
      <Box pos="relative">
        <Container maxW="container.xl" pos="relative">
          <SimpleGrid columns={4}>
            <GridItem colSpan={{ base: 4, md: 3 }}>
              <HStack h="full" py={2}>
                <LogoBrandH
                  src={page?.logo?.publicUrl || "/upload/no-image"}
                  name={page.store}
                  textColor="brand.200"
                  w={useBreakpointValue({ base: 80, md: 120 })}
                  size={useBreakpointValue({ base: "xl", md: "3xl" })}
                  variant="gradient-brand"
                  bgLogoGradient="linear(to-l, brand.800, brand.600, brand.800)"
                />

                <Heading
                  size="lg"
                  pl={6}
                  // color="white"
                >
                  {/* {page.slogan} */}
                </Heading>
              </HStack>
            </GridItem>
            <GridItem
              colSpan={{ base: 4, md: 1 }}
              display={{ base: "none", md: "block" }}
            >
              <HStack h="full">
                <PageItemSocial page={page} fontSize={24} />
                <Spacer />
                <Card variant="gradient-brand" p={4}>
                  <Heading size="sm" color="white">
                    {page.address}
                  </Heading>
                </Card>
              </HStack>
            </GridItem>
          </SimpleGrid>
          <Box
            // boxSize="full"
            pos="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex="-1"
            opacity=".08"
            overflow="hidden"
          >
            <Image
              src="/hoa-tiet.png"
              layout="fill"
              objectFit="cover"
              unoptimized
            />
          </Box>
        </Container>
      </Box>
      <Box pos="sticky" zIndex="sticky" top={0} h="full">
        {openSearch && (
          <Search isOpen={isOS} onClose={closeSearch} UI={SearchModal} />
        )}
        <Card as="header" variant={bgGradient} bg={bg} borderBottom={1} py={4}>
          <Container maxW="container.xl">
            <SimpleGrid columns={4}>
              <GridItem colSpan={1} />

              <GridItem colSpan={2}>
                <HStack h="full">
                  <Desktop
                    size="md"
                    posts={page.company}
                    withPostHashtag={false}
                    withProductCategories={false}
                  />
                </HStack>
              </GridItem>
              <GridItem colSpan={{ base: 4, md: 1 }}>
                <HStack h="full">
                  <IconButton
                    display={{ base: "block", md: "none" }}
                    icon={<HamburgerIcon />}
                    colorScheme="brand"
                    onClick={onToggle}
                  />
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
                      borderColor="brand.600"
                      bg="white"
                      shadow="lg"
                    />

                    <InputRightAddon
                      shadow="lg"
                      borderColor="brand.700"
                      as={Button}
                      bg="brand.700"
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
                      borderColor="brand.700"
                      bg="brand.700"
                      color="white"
                      colorScheme="brand"
                      icon={<AiOutlineSearch />}
                      rounded="md"
                    ></InputRightAddon>
                  </InputGroup>
                  {action({ page })}
                </HStack>
              </GridItem>
            </SimpleGrid>
            <Mobile isOpen={isOpen} posts={page.company} />
          </Container>
        </Card>
      </Box>
    </Fragment>
  );
}
