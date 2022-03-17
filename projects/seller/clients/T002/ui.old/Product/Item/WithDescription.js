import React from "react";
import { chakra, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
const Ma = ({ product, getLink }) => {
  const {
    name,
    price,
    sale,
    image,
    brand,
    num,
    percent,
    as,
    href,
    description,
  } = product;

  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        p={0}
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        w="full"
        rounded="lg"
      >
        <Box px={4} py={2}>
          <chakra.h1
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
            fontSize="3xl"
            textTransform="uppercase"
          >
            {name}
          </chakra.h1>
          <chakra.p
            mt={1}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {description?.slice(0, 80)}
          </chakra.p>
        </Box>

        <Image
          width={300}
          height={300}
          src={image?.publicUrl || "/logo.svg"}
          alt={name}
          layout="responsive"
        />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
          bg="brand.900"
          roundedBottom="lg"
        >
          <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
            $129
          </chakra.h1>
          <chakra.button
            px={2}
            py={1}
            bg="white"
            fontSize="xs"
            color="gray.900"
            fontWeight="bold"
            rounded="sm"
            textTransform="uppercase"
            _hover={{
              bg: "gray.200",
            }}
            _focus={{
              bg: "gray.400",
            }}
          >
            Add to cart
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Ma;
