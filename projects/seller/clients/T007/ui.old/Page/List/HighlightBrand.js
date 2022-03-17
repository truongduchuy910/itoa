import React, { Fragment, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  HStack,
  Button,
  useDisclosure,
  IconButton,
  InputGroup,
  Heading,
  Input,
  Spacer,
  Container,
  Center,
  Text,
  InputRightAddon,
  SimpleGrid,
  GridItem,
  LinkOverlay,
  useBreakpointValue,
  VStack,
  VisuallyHidden,
  Stack,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Mobile from "@itoa/ui/Navbar/components/MobileNav";
import { AiOutlineSearch } from "react-icons/ai";
import Desktop from "@itoa/ui/Navbar/components/Desktop";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import trans from "@itoa/ui/Translate/trans";
import { HamburgerIcon } from "@chakra-ui/icons";
import Search from "@itoa/ui/Search";
import { useRouter } from "next/router";
import Card from "../../Card";
const SearchModal = dynamic(() => import("@itoa/ui/Search/Modal"), {
  ssr: false,
});
export default function PageListEcommerce({
  action = "",
  page,
  cardProps,
  headingProps,
  navTextProps,
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
  const size = useBreakpointValue({ base: 150, md: 200, lg: 250 });
  return (
    <Fragment>
      <Container maxW="container.xl" pos="relative" bg="blackAlpha.500">
        <SimpleGrid columns={5} py={1} gap={0}>
          <GridItem colSpan={{ base: 2, md: 1 }} p={0}>
            <NextLink href="/" passHref>
              <Center as={LinkOverlay} my="-25px">
                <Image
                  src={page?.logo?.publicUrl || "/upload/no-image.ong"}
                  layout="fixed"
                  objectFit="contain"
                  width={size || 80}
                  height={size || 80}
                />
              </Center>
            </NextLink>
          </GridItem>
          <GridItem
            colSpan={{ base: 3, md: 3 }}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Box>
              <Heading
                color="white"
                fontSize={{
                  base: "4xl",
                  sm: "5xl",
                  md: "6xl",
                  lg: "100px",
                }}
                // fontFamily="barlow"
                letterSpacing="tight"
                // fontWeight="extrabold"
                variant="gradient-brand"
                textTransform="capitalize"
                textAlign="center"
              >
                <span
                  display={{
                    base: "block",
                    xl: "inline",
                  }}
                >
                  {page?.store}{" "}
                </span>
              </Heading>
              {/* <Text color="white" size="lg" mb={2} textAlign="center">
                {page.slogan}
              </Text> */}
            </Box>
          </GridItem>
          <Box display={{ md: "flex", base: "none" }} alignItems="center">
            <VStack>
              <Box color="white">{page.address}</Box>
              <Box color="white">{page.phone}</Box>
              <PageItemSocial page={page} />
            </VStack>
          </Box>
        </SimpleGrid>
        <Box
          pos="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="-1"
          overflow="hidden"
        >
          <Image
            src="/img/aaa.jpg"
            layout="fill"
            objectFit="cover"
            // objectPosition="0px -60px"
            // objectPosition={{ md: "0px - 60px" }}
            unoptimized
          />
        </Box>
      </Container>
      <Box pos="sticky" zIndex="sticky" top={0} h="full">
        {openSearch && (
          <Search isOpen={isOS} onClose={closeSearch} UI={SearchModal} />
        )}
        <Card {...cardProps} as="header" borderBottom={1} py={4} px={0}>
          <Container maxW="container.xl">
            <HStack>
              <IconButton
                display={{ base: "block", md: "none" }}
                icon={<HamburgerIcon />}
                colorScheme="brand"
                onClick={onToggle}
              />
              <Desktop
                headingProps={headingProps}
                navTextProps={navTextProps}
                posts={page.company}
                withPostHashtag={false}
                withPinPostHashtag={true}
                withProductCategories={false}
              />

              <Spacer />
              <InputGroup
                maxW={300}
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

            <Mobile isOpen={isOpen} posts={page.company} />
          </Container>
        </Card>
      </Box>
    </Fragment>
  );
}

const SocialButton = ({ children, label, href }) => {
  return (
    <Button
      // bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={10}
      h={10}
      cursor={"pointer"}
      as={"a"}
      target={"_blank"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      // _hover={{
      //   bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      // }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      <Text>{children}</Text>
    </Button>
  );
};

function PageItemSocial({ page = {}, fontSize }) {
  const { pageId, twitter, instagram, zalo } = page;
  return (
    <Stack direction={"row"} spacing={2} fontSize={fontSize}>
      {pageId && (
        <SocialButton label="Facebook" href={"https://facebook.com/" + pageId}>
          <FaFacebook />
        </SocialButton>
      )}
      {twitter && (
        <SocialButton label="twitter" href={twitter}>
          <FaTwitter />
        </SocialButton>
      )}
      {instagram && (
        <SocialButton label="instagram" href={instagram}>
          <FaInstagram />
        </SocialButton>
      )}
    </Stack>
  );
}
