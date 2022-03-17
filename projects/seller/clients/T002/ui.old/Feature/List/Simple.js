import {
  Box,
  LinkBox,
  Heading,
  SimpleGrid,
  Square,
  VStack,
  LinkOverlay,
  Circle,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Card from "../../Card";
function StatsCard({ feature, variant, titleProps }) {
  const { name, image, content } = feature;
  return (
    <Card variant={variant} shawdow="lg" pos="relative" h="100%">
      <LinkBox as={Box}>
        <Box
          pos="absolute"
          w="full"
          h="full"
          zIndex="-1"
          bottom="0"
          right="0"
          opacity=".4"
        >
          <Image unoptimized src="/ja.png" layout="fill" objectFit="contain" />
        </Box>
        <Square w="full" px={3} py={2}>
          <VStack>
            <Circle borderWidth={6} p={3}>
              <Image
                width={30}
                height={30}
                src={image?.publicUrl || "/assets/img/no-image.png"}
                layout="fixed"
                objectFit="cover"
              />
            </Circle>
            <NextLink href={`/tinh-nang/${feature.id}`} passHref>
              <LinkOverlay>
                <Heading
                  size="xs"
                  align="center"
                  variant="white"
                  {...titleProps}
                >
                  {name}
                </Heading>
              </LinkOverlay>
            </NextLink>
          </VStack>
        </Square>
      </LinkBox>
    </Card>
  );
}

export default function BasicStatistics({
  allFeatures,
  _allFeaturesMeta,
  clickMore,
  title,
  columns = { base: 2, md: 4, lg: 4 },
  my,
  variant,
  display,
  titleProps,
}) {
  return (
    <Box maxW="7xl" mx={"auto"} my={my} rounded="lg">
      {title && (
        <Heading textAlign={"center"} size="xs" fontWeight={"bold"} py={9}>
          {title}
        </Heading>
      )}
      <SimpleGrid columns={columns} gap={{ base: 1, md: 2, lg: 3 }}>
        {allFeatures.map((feature) => {
          return (
            <StatsCard
              key={feature.id}
              feature={feature}
              variant={variant}
              titleProps={titleProps}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
