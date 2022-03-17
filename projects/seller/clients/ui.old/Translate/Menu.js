import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  chakra,
} from "@chakra-ui/react";
import NextLink from "next/link";
export default function TranslateMenu({ options, locale, href, ...props }) {
  const current = options.find((option) => option.value === locale);
  return (
    <Menu {...props}>
      <MenuButton
        as={Button}
        leftIcon={<chakra.span>{current?.flag}</chakra.span>}
        variant="link"
      >
        {current?.label}
      </MenuButton>
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
