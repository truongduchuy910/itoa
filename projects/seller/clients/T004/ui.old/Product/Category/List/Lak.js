import {
  Box,
  Center,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Square,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Translate from "@itoa/ui/Translate";
const Lak = ({ allProductCategories }) => {
  return (
    <SimpleGrid columns={2} gap={2}>
      {/*Section Title Start*/}
      {allProductCategories?.map((category, index) => {
        return (
          category.url && (
            <NextLink
              key={category.id}
              href={encodeURI(`/san-pham/${category.url}`)}
              passHref
            >
              <Link title={category.name} pos="relative">
                <Image
                  width={1920}
                  height={1920}
                  loading={index < 4 ? "eager" : "lazy"}
                  priority={index < 4}
                  blurDataURL="/assets/img/no-image.png"
                  placeholder="blur"
                  src={category.file?.publicUrl || "/assets/img/no-image.png"}
                  alt={category.name}
                  layout="responsive"
                  objectFit="cover"
                />

                <Center pos="absolute" w="full" h="full" top={0} zIndex={1}>
                  <VStack>
                    <Heading size="md" color="white">
                      {category.name}
                    </Heading>
                    <Text color="white">
                      <Translate content="Xem ngay" />
                    </Text>
                  </VStack>
                </Center>
              </Link>
            </NextLink>
          )
        );
      })}
    </SimpleGrid>
  );
};
export default Lak;
