import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

export default function WithSubnavigation({
  page,
  allServices,
  allPostHashtags,
  // router
  onClickPostHashtag = (hashtag) => {},
  onClickService = (service) => {},
  onClickHome = () => {},
}) {
  const NAV_ITEMS = [
    {
      label: "Dịch vụ",
      href: "#",
      children: allServices?.map((service) => {
        return {
          ...service,
          label: service.name,
          // subLabel: "Trending Design to inspire you",
          href: "#",
        };
      }),
    },
    ...allPostHashtags?.map((hashtag) => {
      return {
        ...hashtag,
        label: hashtag.name,
        href: hashtag.url,
      };
    }),
  ];
  const { isOpen, onToggle } = useDisclosure();

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
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Link>
              <Text
                textAlign={useBreakpointValue({
                  base: "center",
                  md: "left",
                })}
                onClick={() => {
                  onClickHome();
                }}
              >
                <img
                  src={

                    (page.logo?.publicUrl.replace(/\/md/g, "/sm") ||
                      "/assets/img/no-image.png")
                  }
                  style={{ height: 50 }}
                />{" "}
                {/* {page.store} */}
              </Text>
            </Link>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav
                NAV_ITEMS={NAV_ITEMS}
                onClickPostHashtag={onClickPostHashtag}
                onClickService={onClickService}
              />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              display={{ base: "inline-flex", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              href={`tel:${page.phone}`}
              bg={"brand.400"}
              colorScheme={"brand"}
            >
              Gọi ngay
            </Button>
          </Stack>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav
            page={page}
            NAV_ITEMS={NAV_ITEMS}
            onClickPostHashtag={onClickPostHashtag}
            onClickService={onClickService}
          />
        </Collapse>
      </Container>
    </Box>
  );
}

const DesktopNav = ({ NAV_ITEMS, onClickPostHashtag, onClickService }) => {
  return (
    <Stack
      direction={"row"}
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                onClick={() => {
                  onClickPostHashtag(navItem);
                }}
                fontSize={"sm"}
                fontWeight={500}
                _hover={{
                  textDecoration: "none",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      onClickService={onClickService}
                      key={child.label}
                      {...child}
                      service={child}
                    />
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

const DesktopSubNav = ({ label, onClickService, subLabel, service }) => {
  service;
  return (
    <Link
      onClick={() => {
        onClickService(service);
      }}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("gray.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "brand.400" }}
            fontWeight={500}
          >
            {service.name}
          </Text>
          {/* <Text fontSize={"sm"}>{service.name}</Text> */}
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
          <Icon w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ NAV_ITEMS, onClickPostHashtag, onClickService, page }) => {
  return (
    <Stack p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          page={page}
          onClickPostHashtag={onClickPostHashtag}
          onClickService={onClickService}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = (hashtag) => {
  const {
    label,
    children,
    href,
    page,
    onClick,
    onClickPostHashtag = (hashtag) => {},
    onClickService = (service) => {},
  } = hashtag;
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        onClick={() => {
          onClickPostHashtag(hashtag);
        }}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
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
          borderColor={"gray.700"}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                href={child.href}
                onClick={() => onClickService(child)}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
