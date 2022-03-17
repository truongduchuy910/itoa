import React, { useMemo } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Button,
  Heading,
  Badge,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import blurDataURL from "@itoa/ui/utils/no-image";
const Ma = ({ product }) => {
  const { name, price, sale, image, brand, num, percent, as, href } = product;
  const blur = useMemo(() => blurDataURL(200), []);
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="full"
        mx="auto"
      >
        <NextLink href={href}>
          <Box
            bg="gray.300"
            w="full"
            rounded="lg"
            shadow="md"
            cursor="pointer"
            overflow="hidden"
          >
            <Image
              alt={name}
              width={200}
              height={200}
              layout="responsive"
              objectFit="contain"
              objectPosition="center"
              src={image?.publicUrl || "/assets/img/no-image.png"}
              placeholder="blur"
              blurDataURL={blur}
            />
          </Box>
        </NextLink>

        <Box
          w="90%"
          maxW={200}
          bg={useColorModeValue("white", "gray.800")}
          mt={-10}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          zIndex={1}
        >
          <Heading
            size="xs"
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color={useColorModeValue("gray.800", "white")}
            letterSpacing={1}
          >
            {name}
          </Heading>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
            bg={useColorModeValue("gray.200", "gray.700")}
          >
            <chakra.span
              fontWeight="bold"
              color={useColorModeValue("gray.800", "gray.200")}
            >
              {num.format(sale || price)}
            </chakra.span>
            <Badge colorScheme={percent >= 30 ? "red" : "orange"}>
              -{percent}%
            </Badge>
            <Button
              colorScheme="brand"
              size="xs"
              fontWeight="bold"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
            >
              Chọn
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Ma;
