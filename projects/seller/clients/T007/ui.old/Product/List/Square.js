import { Button } from "@chakra-ui/button";
import {
  GridItem,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
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
  Spacer,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Field from "@itoa/ui/Field";
import Percent from "@itoa/ui/utils/Percent";
import Translate from "../../Translate";
export default function ProductListSquare({
  allProducts,
  _allProductsMeta,
  onClickMore,
  unit,
  detailButton = false,
  withPrice = true,
  moreButton = true,
  loading,
}) {
  if (!loading && allProducts?.length === 0) return "";
  return (
    <Fragment>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 2, md: 3 }}
      >
        {allProducts?.map((product, index) => {
          const [category] = product.categories;
          const { stocks = [], _stocksMeta = {} } = product;

          return (
            <GridItem
              key={"GridItem" + product.id + index}
              colSpan={1}
              rowSpan={1}
              mb={5}
            >
              <LinkBox borderWidth={1} p={3} rounded="3xl" shadow="lg">
                <Image
                  src={product?.image?.publicUrl || "/assets/img/no-image.png"}
                  width={300}
                  height={300}
                  layout="responsive"
                  objectFit="contain"
                />
                <HStack>
                  <NextLink
                    href={`/san-pham/${category.url}/${product.url}`}
                    passHref
                  >
                    <LinkOverlay>
                      <Heading size="md" my={2} fontWeight="normal" mx="auto">
                        {product.name}
                      </Heading>
                    </LinkOverlay>
                  </NextLink>
                  <Spacer />
                  {withPrice ? (
                    <Box>
                      <Text
                        fontWeight="bold"
                        color="brand.500"
                        colorScheme="brand"
                        mt={2}
                        ml={2}
                      >
                        <Field>
                          {product.sale || product.price} {unit}
                        </Field>
                      </Text>
                      {product.sale && (
                        <Badge ml="1" colorScheme="red" float="right">
                          -
                          <Percent price={product.price} sale={product.sale} />%
                        </Badge>
                      )}
                    </Box>
                  ) : (
                    <Badge>{product?.brand?.name}</Badge>
                  )}
                </HStack>
                {/* {detailButton && (
                  <NextLink
                    href={`/san-pham/${category.url}/${product.url}`}
                    passHref
                  >
                    <Button
                      as={LinkOverlay}
                      colorScheme="brand"
                      w="full"
                      rounded="3xl"
                    >
                      <Translate content={product.name} />
                    </Button>
                  </NextLink>
                )} */}
              </LinkBox>
            </GridItem>
          );
        })}
      </Grid>
      {moreButton && _allProductsMeta.count > allProducts?.length ? (
        <Center my={3}>
          <Button onClick={onClickMore} colorScheme="brand" color="brand.200">
            <Translate content="Xem thêm" />
          </Button>
        </Center>
      ) : null}
    </Fragment>
  );
}
