import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineShop } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import Translate from "@itoa/components/Translate";
import NextLink from "next/link";
import Card from "@itoa/components/Card";
export default function SimpleJustified({ header = true }) {
  const w = 21;
  return (
    <Card variant="gradient-brand">
      <Flex px={50} py={68} alignItems="center" justifyContent="center">
        <Box
          maxW="7xl"
          w={{ md: "3xl", lg: "4xl" }}
          mx="auto"
          py={{ base: 8, lg: 16 }}
          px={{ base: 4, lg: 8 }}
          display={{ lg: "flex" }}
          alignItems={{ lg: "center" }}
          justifyContent={{ lg: "space-between" }}
        >
          <Box>
            <Heading
              fontSize={{ base: "3xl", sm: "4xl" }}
              fontWeight="extrabold"
              // letterSpacing="tight"
              mb={2}
              lineHeight="shorter"
              color="white"
            >
              <Translate content="Bạn tìm kiếm nội dung" as="span" />?
            </Heading>
            <Translate
              as={Text}
              size="md"
              color="white"
              content="Thông tin về sản phẩm và nhiều kiến thức bổ ích khác"
            />
            .
          </Box>
          <Stack
            direction={{ base: "column", sm: "row" }}
            mt={{ base: 8, lg: 0 }}
            shrink={{ lg: 0 }}
          >
            <NextLink href="/san-pham" passHref>
              <Button
                as="a"
                leftIcon={<AiOutlineShop />}
                w={["full", , "auto"]}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                shadow="md"
                color={useColorModeValue("white")}
                bg={useColorModeValue("brand.500", "brand.500")}
                _hover={{
                  bg: useColorModeValue("brand.700", "brand.500"),
                }}
                isTruncated
              >
                <Translate content="Sản phẩm" />
              </Button>
            </NextLink>
            <NextLink href="/bai-viet" passHref>
              <Button
                leftIcon={<IoNewspaperOutline />}
                w={["full", , "auto"]}
                isTruncated
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                px={5}
                py={3}
                border="solid transparent"
                fontWeight="bold"
                rounded="md"
                shadow="md"
                color="brand.500"
                bg="white"
                _hover={{
                  bg: "brand.50",
                }}
              >
                <Translate content="Bài viết" />
              </Button>
            </NextLink>
          </Stack>
        </Box>
      </Flex>
    </Card>
  );
}
