import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import CopyrightSimple from "../Copyright/Simple";
export default function SmallWithNavigation({
  allPages,
  _allPagesMeta,
  action,
  page,
}) {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={6}>
          <NextLink href={"/"}>
            <Link href={"/"}>Trang chủ</Link>
          </NextLink>
          <NextLink href={"/gioi-thieu"}>
            <Link href={"/gioi-thieu"}>Giới thiệu</Link>
          </NextLink>
          <Link href={"#"}>Blog</Link>
          <Link href={"#"}>Contact</Link>
        </Stack>
        <CopyrightSimple />
      </Container>
    </Box>
  );
}
