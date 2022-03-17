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
export default function ProductCategoryListSimpeSquare({
  allProductCategories,
  columns = 2,
}) {
  return (
    <SimpleGrid columns={columns} gap={{ base: 2, md: 2, lg: 3 }}>
      {/*Section Title Start*/}
      {allProductCategories?.map((category, index) => {
        return (
          category.url && (
            <NextLink
              key={category.id + index}
              href={encodeURI(`/san-pham/${category.url}`)}
              passHref
            >
              <Link>
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
                  objectFit="contain"
                />

                {/* <Center pos="absolute" w="full" h="full" top={0} zIndex={1}>
                  <VStack>
                    <Heading size="md" color="black">
                      {category.name}
                    </Heading>
                    <Text color="white">
                      <Translate content="Xem ngay" />
                    </Text>
                  </VStack>
                </Center> */}
              </Link>
            </NextLink>
          )
        );
      })}
    </SimpleGrid>
  );
}
