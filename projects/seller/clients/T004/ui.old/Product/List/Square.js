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
  onClickProduct,
  onClickMore,
  unit,
  withPrice = true,
  moreButton = true,
}) {
  return (
    <Fragment>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: 2, md: 2 }}
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
              <NextLink
                href={`/san-pham/${category.url}/${product.url}`}
                passHref
              >
                <Link>
                  <Image
                    src={product?.image?.publicUrl || "/assets/img/no-image.png"}
                    width={300}
                    height={300}
                    layout="responsive"
                    objectFit="contain"
                  />
                  <Flex p={1}>
                    <Heading size="xs" mt={2} fontWeight="normal" mx="auto">
                      {product.name}
                    </Heading>
                    {withPrice && (
                      <Fragment>
                        <Spacer />
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
                              <Percent
                                price={product.price}
                                sale={product.sale}
                              />
                              %
                            </Badge>
                          )}
                        </Box>
                      </Fragment>
                    )}
                  </Flex>
                </Link>
              </NextLink>
            </GridItem>
          );
        })}
      </Grid>
      {moreButton && _allProductsMeta.count > allProducts?.length ? (
        <Center my={3}>
          <Button onClick={onClickMore} colorScheme="brand">
            <Translate content="Xem thêm" />
          </Button>
        </Center>
      ) : null}
    </Fragment>
  );
}
