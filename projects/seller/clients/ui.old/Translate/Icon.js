import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Text,
  MenuList,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HiOutlineTranslate } from "react-icons/hi";
export default function TranslateIcon({ options, href, current, ...props }) {
  return (
    <Menu>
      <MenuButton
        {...props}
        py={3}
        size="md"
        as={IconButton}
        variant="link"
        isRound
        colorScheme="brand"
        icon={
          current?.value === "vi" ? (
            <HiOutlineTranslate />
          ) : (
            <Text>{current?.flag}</Text>
          )
        }
      />

      <MenuList>
        {options.map((option) => (
          <NextLink
            href={href}
            locale={option.value}
            passHref
            key={option.value}
          >
            <MenuItem as={Link}>{option.label}</MenuItem>
          </NextLink>
        ))}
      </MenuList>
    </Menu>
  );
}
