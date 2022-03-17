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
import Simple from "../../../../elements/Toast/Simple";
const Lak = ({ allProductCategories }) => {
  return (
    <SimpleGrid columns={2} gap={2} py={2}>
      {/*Section Title Start*/}
      {allProductCategories?.map((category, index) => {
        return (
          <NextLink
            key={category.id}
            href={`/san-pham/${category.url}`}
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
                src={encodeURI(category.file?.publicUrl)}
                alt={category.name}
                layout="responsive"
                objectFit="cover"
              />
              <Center pos="absolute" w="full" h="full" top={0} zIndex={1}>
                <VStack>
                  <Heading size="md" color="white">
                    {category.name}
                  </Heading>
                  <Text color="white">Xem ngay</Text>
                </VStack>
              </Center>
            </Link>
          </NextLink>
        );
      })}
    </SimpleGrid>
  );
};
export default Lak;
