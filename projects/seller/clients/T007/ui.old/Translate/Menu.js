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
import Translate from ".";
export default function TranslateMenu({
  options,
  locale,
  color,
  href,
  ...props
}) {
  const current = options.find((option) => option.value === locale);
  return (
    <Menu {...props}>
      <MenuButton
        color={color}
        as={Button}
        // leftIcon={<chakra.span>{current?.flag}</chakra.span>}
        variant="link"
      >
        <Translate content="Ngôn ngữ" />
      </MenuButton>
      <MenuList color="black">
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
