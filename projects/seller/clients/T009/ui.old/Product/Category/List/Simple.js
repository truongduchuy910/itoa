import { Img } from "@chakra-ui/image";
import { Box, Heading, SimpleGrid, VStack, Link } from "@chakra-ui/layout";
import Image from "next/image";
import NextLink from "next/link";
export default function CategoryListSimple({ allProductCategories, columns }) {
  return (
    <SimpleGrid columns={columns} gap={{ base: 2, md: 2, lg: 3 }}>
      {allProductCategories?.map((category) => {
        return (
          <NextLink
            key={category.id}
            href={`/san-pham/${category.url}`}
            passHref
          >
            <Link>
              <VStack mb={3}>
                <Box
                  w="full"
                  pb="100%"
                  pos="relative"
                  rounded="lg"
                  overflow="hidden"
                >
                  <Image
                    src={category.file.publicUrl || "/assets/img/no-image.png"}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
                <Heading size="md">{category.name}</Heading>
              </VStack>
            </Link>
          </NextLink>
        );
      })}
    </SimpleGrid>
  );
}
