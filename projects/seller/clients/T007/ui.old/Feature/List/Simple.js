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
function StatsCard({ feature, titleProps, cardProps }) {
  const { name, image } = feature;
  return (
    <Card {...cardProps} shawdow="lg" pos="relative" h="100%">
      {/* <Image src="/hoa-tiet.png" layout="fill" objectFit="cover" unoptimized /> */}
      <Box
        pos="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="-1"
        opacity=".15"
        overflow="hidden"
      >
        <Image
          src="/hoa-tiet.png"
          layout="fill"
          objectFit="cover"
          unoptimized
        />
      </Box>
      <LinkBox as={Box}>
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
  cardProps,
  mt,
  gap,
}) {
  return (
    <Box maxW="7xl" mx={"auto"} my={my} mt={mt} rounded="lg">
      {title && (
        <Heading textAlign={"center"} size="xs" fontWeight={"bold"} py={9}>
          {title}
        </Heading>
      )}

      <SimpleGrid columns={columns} gap={gap}>
        {allFeatures.map((feature) => {
          return (
            <StatsCard
              cardProps={cardProps}
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
