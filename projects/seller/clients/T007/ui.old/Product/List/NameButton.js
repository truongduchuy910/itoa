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
                {detailButton && (
                  <NextLink
                    href={`/san-pham/${category.url}/${product.url}`}
                    passHref
                  >
                    <Button
                      mt={4}
                      as={LinkOverlay}
                      colorScheme="brand"
                      w="full"
                      fontSize={{ base: "xs", sm: "sm" }}
                      rounded="3xl"
                    >
                      {product.name}
                    </Button>
                  </NextLink>
                )}
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
