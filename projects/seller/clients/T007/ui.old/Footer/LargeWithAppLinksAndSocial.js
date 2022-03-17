import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import CopyrightSimple from "@itoa/ui/Copyright/Simple";
import PageItemSocial from "@itoa/ui/Page/Item/Social";
// import AppStoreBadge from "@/components/AppStoreBadge";
// import PlayStoreBadge from "@/components/PlayStoreBadge";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithAppLinksAndSocial({
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
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Địa chỉ liên hệ</ListHeader>
            <Link href={"#"}>Chi nhánh 1</Link>
            <Link href={"#"}>Chi nhánh 2</Link>
            <Link href={"#"}>Chi nhánh 3</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Công ty</ListHeader>
            <Link href={"#"}>Về chúng tôi</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Tuyển dụng</Link>
            <Link href={"#"}>Cửa hàng</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Chính sách khách hàng</ListHeader>
            <Link href={"#"}>Chính sách bảo mật</Link>
            <Link href={"#"}>Điều khoản dịch vụ</Link>
            <Link href={"#"}>Luật</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Install App</ListHeader>
            {/* <AppStoreBadge />
            <PlayStoreBadge /> */}
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <CopyrightSimple />
          <PageItemSocial />
        </Container>
      </Box>
    </Box>
  );
}
