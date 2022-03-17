import { Button } from "@chakra-ui/button";
import { GridItem, Link } from "@chakra-ui/layout";
import { Fragment } from "react";
import NextLink from "next/link";
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Field from "@itoa/ui/Field";
import Percent from "@itoa/ui/utils/Percent";
import { ChevronRightIcon } from "@chakra-ui/icons";
export default function ProductListNoPrice({
  allProducts,
  _allProductsMeta,
  onClickProduct,
  onClickMore,
}) {
  return (
    <Fragment>
      <SimpleGrid columns={{ base: 2, md: 3 }} gap={{ base: 2, md: 3, lg: 4 }}>
        {allProducts?.map((product, index) => {
          const [category] = product.categories;
          return (
            <GridItem
              key={"GridItem" + product.id + index}
              colSpan={1}
              rowSpan={1}
            >
              <NextLink
                href={`/san-pham/${category.url}/${product.url}`}
                passHref
              >
                <Link
                  display={"block"}
                  role={"group"}
                  _hover={{
                    textDecor: "none",
                  }}
                >
                  <Box
                    role={"group"}
                    rounded="lg"
                    shadow="md"
                    width={"full"}
                    padding="50%"
                    pos="relative"
                    overflow="hidden"
                    transition={"all 0.3s ease"}
                    _hover={{ transform: "translateY(-10px)" }}
                    // _hover={{ transform: "scale(1.05) translateY(-10px)" }}
                  >
                    <Image
                      src={product?.image?.publicUrl || "/assets/img/no-image.png"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                  <Stack direction={"row"} align={"center"} mt={3} mb={5}>
                    <Box>
                      <Heading
                        size="sm"
                        transition={"all .3s ease"}
                        _groupHover={{ color: "brand.400" }}
                        fontWeight={500}
                      >
                        {product.name}
                      </Heading>
                    </Box>
                    <Flex
                      transition={"all .3s ease"}
                      transform={"translateX(-10px)"}
                      opacity={0}
                      _groupHover={{
                        opacity: "100%",
                        transform: "translateX(0)",
                      }}
                      justify={"flex-end"}
                      align={"self-end"}
                      flex={1}
                    >
                      <Icon
                        color={"brand.400"}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                      />
                    </Flex>
                  </Stack>
                </Link>
              </NextLink>
            </GridItem>
          );
        })}
      </SimpleGrid>

      {_allProductsMeta.count > allProducts?.length ? (
        <Center my={3}>
          <Button onClick={onClickMore}>Xem thêm</Button>
        </Center>
      ) : null}
    </Fragment>
  );
}
