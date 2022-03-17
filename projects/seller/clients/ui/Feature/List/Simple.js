import {
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  SimpleGrid,
  Square,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
  Link,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
function StatsCard({ feature }) {
  const { name, image, content } = feature;
  return (
    <NextLink href={`/tinh-nang/${feature.id}`} passHref>
      <Link>
        <Square
          w="full"
          px={3}
          py={4}
          rounded={"lg"}
          shadow={"xl"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.400", "gray.200")}
        >
          <VStack>
            <Box width={100} height={100}>
              <Image
                width={100}
                height={100}
                src={image?.publicUrl || "/assets/img/no-image.png"}
                layout="responsive"
                objectFit="contain"
              />
            </Box>
            <Heading size="sm" align="center" pt={2} colorScheme="brand">
              {name}
            </Heading>
          </VStack>
        </Square>
      </Link>
    </NextLink>
  );
}

export default function BasicStatistics({
  allFeatures,
  _allFeaturesMeta,
  clickMore,
}) {
  return (
    <Box maxW="7xl" mx={"auto"} pb={20}>
      <chakra.h2
        textAlign={"center"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        py={9}
      >
        Thông tin
      </chakra.h2>
      <SimpleGrid
        columns={{ base: 2, md: 4, lg: 4 }}
        gap={{ base: 2, md: 2, lg: 3 }}
      >
        {allFeatures.map((feature) => {
          return <StatsCard feature={feature} />;
        })}
      </SimpleGrid>
    </Box>
  );
}
