import React from "react";
import { Box, Stack, Heading, Text } from "@chakra-ui/react";
import Video from "@itoa/ui/Carousel/components/Video";

const KuttyHero = ({ page, py }) => {
  return (
    <Box pos="relative" overflow="hidden" py={py}>
      <Box maxW="7xl" mx="auto">
        <Box pos="relative" w="full" border="solid 1px transparent">
          <Box
            mt={{ base: 10 }}
            mx="auto"
            maxW={{ base: "7xl" }}
            px={{ base: 4, sm: 6, lg: 8 }}
            mt={{ base: 12, md: 16, lg: 20, xl: 28 }}
          >
            <Box
              textAlign="center"
              w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
              mx="auto"
            >
              <Heading
                pt={4}
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl", lg: "8xl" }}
                letterSpacing="tight"
                fontWeight="extrabold"
                variant="gradient-brand"
              >
                <span
                  display={{ base: "block", xl: "inline" }}
                  // color={useColorModeValue("brand.500", "brand.400")}
                >
                  {page?.store}{" "}
                </span>
              </Heading>
              <Heading size="lg">{page?.slogan}</Heading>
              <Text
                mt={{ base: 3, sm: 5, md: 5 }}
                mx={{ sm: "auto", lg: 0 }}
                mb={6}
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.500"
                lineHeight="base"
              >
                {page.intro}
              </Text>
              {page.youtube && (
                <Stack
                  direction={{ base: "column", sm: "column", md: "row" }}
                  mb={{ base: 4, md: 8 }}
                  spacing={{ base: 4, md: 2 }}
                  justifyContent="center"
                >
                  <Box rounded="full" shadow="md">
                    <Video src={page.youtube} title={page.store} />
                  </Box>
                </Stack>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default KuttyHero;
