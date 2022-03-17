import React, { useMemo } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Controller from "./Controller";
import Image from "next/image";
import PageList from "../../Page/List";
import Translate from "../../Translate";
function UI({ loading, allServices, _allServicesMeta, clickMore }) {
  if (loading) return "...";
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "brand.600")}
      w="full"
      u
      justifyContent="center"
      alignItems="center"
    >
      <Box
        shadow="xl"
        bg={useColorModeValue("white", "brand.800")}
        px={8}
        py={20}
        mx="auto"
      >
        {allServices?.map((service, index) => {
          const image = (
            <Box
              w="full"
              h="full"
              py={48}
              bg={useColorModeValue("brand.200", "brand.700")}
              pos="relative"
            >
              {service?.image && (
                <Image
                  src={service.image?.publicUrl || "/assets/img/no-image.png"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </Box>
          );

          return (
            <SimpleGrid
              key={service.id}
              alignItems="start"
              columns={{ base: 1, md: 2 }}
              mb={24}
              spacingY={{ base: 10, md: 32 }}
              spacingX={{ base: 10, md: 24 }}
            >
              {index % 2 != 0 && image}
              <Box>
                <Heading
                  mb={4}
                  color="brand.500"
                  fontSize={{ base: "2xl", md: "4xl" }}
                  // fontWeight="extrabold"
                  letterSpacing="tight"
                  textAlign={{ base: "center", md: "left" }}
                  lineHeight={{ md: "shorter" }}
                  textShadow="2px 0 currentcolor"
                >
                  {service?.name}
                </Heading>
                <Text
                  mb={5}
                  textAlign={{ base: "center", sm: "left" }}
                  color={useColorModeValue("brand.600", "brand.400")}
                  fontSize={{ md: "lg" }}
                >
                  {service?.description}
                </Text>
                <PageList
                  UI={({ page }) => (
                    <Button
                      w={{ base: "full", sm: "auto" }}
                      size="lg"
                      colorScheme="black"
                      bg="gray.900"
                      color="white"
                      as="a"
                      href={`tel:${page.phone}`}
                    >
                      <Translate content="Gọi ngay" />
                    </Button>
                  )}
                />
              </Box>
              {index % 2 == 0 && image}
            </SimpleGrid>
          );
        })}
      </Box>
    </Flex>
  );
}
export default function ListSideBySide() {
  return <Controller UI={UI} />;
}
