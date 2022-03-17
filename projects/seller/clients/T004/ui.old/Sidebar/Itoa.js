import data from "./data.json";
import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import React, { useEffect, useRef } from "react";
import LogoBrandH from "../Logo/BrandH";
import NextLink from "next/link";
import Translate from "../Translate";
import PostHashtagList from "../Post/Hashtag/List";
import TranslateIcon from "../Translate/Icon";
import TranslateMenu from "../Translate/Menu";
import { useRouter } from "next/router";
import UserAuth from "../User/Auth";
import UserAuthUI from "../User/Auth/UI";
export default function Swibc({ content }) {
  const router = useRouter();
  const { pathname } = router;
  const sidebar = useDisclosure();
  const integrations = useDisclosure({ defaultIsOpen: true });
  const articles = useDisclosure({ defaultIsOpen: true });
  data.push({ name: "CarouselSimple", href: "/ui/carouselsimple" });
  data.push({
    name: "CarouselWithAngledImage",
    href: "/ui/carouselwithangledimage",
  });
  data.push({ name: "CarouselWithCaptions", href: "/ui/carouselwithcaptions" });
  data.push({ name: "CarouselWithControls", href: "/ui/carouselwithcontrols" });
  data.push({
    name: "CarouselWithIndicators",
    href: "/ui/carouselwithindicators",
  });
  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: useColorModeValue("gray.600", "gray.300"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };
  const fieldRef = useRef(null);
  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.scrollIntoView({
        // behavior: "smooth",
      });
    }
  });
  const SidebarContent = (props) => {
    return (
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("inherit", "gray.700")}
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          {/* <Logo /> */}
          <LogoBrandH src="/logo.svg" />
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("brand.500", "white")}
            fontWeight="semibold"
          >
            Itoa.vn
          </Text>
        </Flex>
        <Translate UI={TranslateMenu} ml={4} />

        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NextLink href="/" passHref>
            <Link>
              <NavItem icon={MdHome}>
                <Translate content="Trang chủ" />
              </NavItem>
            </Link>
          </NextLink>

          <NavItem icon={FaRss} onClick={articles.onToggle}>
            <Translate content="Bài viết" />
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={articles.isOpen && "rotate(90deg)"}
            />
          </NavItem>

          <Collapse in={articles.isOpen}>
            <PostHashtagList
              UI={({ allPostHashtags }) => {
                return allPostHashtags.map((hashtag) => {
                  return (
                    <NextLink
                      key={hashtag.id}
                      href={`/bai-viet/${hashtag.url}`}
                      passHref
                    >
                      <Link>
                        <NavItem pl="12" py="2">
                          {hashtag.name}
                        </NavItem>
                      </Link>
                    </NextLink>
                  );
                });
              }}
            />
          </Collapse>

          <NavItem icon={HiCode} onClick={integrations.onToggle}>
            <Translate content="Giao diện" />
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={integrations.isOpen && "rotate(90deg)"}
            />
          </NavItem>
          <Collapse in={integrations.isOpen}>
            {data.map(({ href, name }) => {
              return (
                <NextLink href={href} passHref key={href + name}>
                  <Link ref={href === pathname ? fieldRef : null}>
                    <NavItem
                      pl="2"
                      py="2"
                      size="xs"
                      color={href === pathname ? "brand.500" : "brand.800"}
                      fontWeight={href === pathname ? "bold" : "normal"}
                    >
                      {name}
                    </NavItem>
                  </Link>
                </NextLink>
              );
            })}
          </Collapse>
        </Flex>
      </Box>
    );
  };
  return (
    <Box
      as="section"
      // bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup w="96" display={{ base: "none", md: "flex" }}>
            <InputLeftElement color="gray.500" children={<FiSearch />} />
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <Flex align="center">
            <Translate UI={TranslateIcon} />
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            {/* <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            /> */}
            <UserAuth UI={UserAuthUI}/>
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          <Box borderWidth="4px" borderStyle="dashed" rounded="md" p={4}>
            {content}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
