import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronDownIcon, Icon, UpDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack, Text, Link } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { Fragment } from "react";
import NextLink from "next/link";
export default function SidebarItemSimple({
  label,
  icon: Icon,
  all = [],
  current,
  _all = {},
  clickToggle,
  getLink,
  first,
}) {
  return (
    <Fragment>
      <Box
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
        p={{ base: 2, md: 3 }}
        mb={2}
      >
        <Heading size={"xs"} colorScheme={"brand"}>
          <Icon style={{ marginRight: 5, display: "inline-block" }} />
          {label}
        </Heading>
        <Stack px={0} py={2}>
          {all.map((item) => (
            <Item key={item.id} {...item} current={current} getLink={getLink} />
          ))}
        </Stack>
        {_all.count >= first && (
          <IconButton
            size={"xs"}
            w={"full"}
            mt={2}
            borderRadius="md"
            icon={<UpDownIcon />}
            onClick={clickToggle}
          />
        )}
      </Box>
    </Fragment>
  );
}

const Item = (props) => {
  const { url, name, childs, current, getLink } = props;
  const { isOpen, onToggle } = useDisclosure();
  const { href, as } = getLink(url);

  return (
    <Stack spacing={4} onClick={childs && onToggle}>
      <Flex
        py={1}
        as={Link}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        {name && (
          <NextLink href={href} >
            <Text fontWeight={current === url ? 900 : 200}>{name}</Text>
          </NextLink>
        )}
        {childs?.length ? (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        ) : null}
      </Flex>

      {childs?.length ? (
        <Collapse
          in={isOpen}
          animateOpacity
          style={{ marginTop: "0!important" }}
        >
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={"gray.700"}
            align={"start"}
          >
            {childs &&
              childs.map((child) => {
                const { href, as } = getLink(child.url);
                return (
                  <NextLink key={child.id} href={href} >
                    <Text
                      fontWeight={currentCategory === child.url ? 900 : 200}
                      py={2}
                    >
                      {child.name}
                    </Text>
                  </NextLink>
                );
              })}
          </Stack>
        </Collapse>
      ) : null}
    </Stack>
  );
};
