import React from "react";
import { chakra, Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
const Ma = ({ category }) => {
  return (
    <Link href={category.href} as={category.as}>
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          border="lg"
          bg={useColorModeValue("white", "gray.800")}
          borderWidth="1px"
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          w="full"
          cursor="pointer"
        >
          <Image
            width={500}
            height={500}
            layout="responsive"
            objectFit="cover"
            src={category?.file?.publicUrl || "/assets/img/no-image.png"}
            loading="eager"
          />

          <Box py={2} textAlign="center">
            <Text
              display="block"
              fontSize="lg"
              colorScheme="brand"
              color={useColorModeValue("gray.800", "white")}
              fontWeight="bold"
            >
              {category.name}
            </Text>
            <chakra.span
              fontSize="sm"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {category?.description}
            </chakra.span>
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};

export default Ma;
