import Image from "next/image";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/layout";

import FAQ from "../../FAQ";
import FAQSimple from "../../FAQ/Simple";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import Products from "../List";
import ProductAttributeListSimple from "../Attribute/List/Simple";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosFlash } from "react-icons/io";
import { useRouter } from "next/router";
import { onOpenCart } from "@itoa/ui/Product/Cart/Item/List/Drawer";
import Field from "@itoa/ui/Field";
import ProductCartItemCreate from "../Cart/Item/Create";
import ProductCartItemCreateSimple from "../Cart/Item/Create/Simple";
import ProductCartItemCreateQuick from "../Cart/Item/Create/Quick";
const ProductSimple = dynamic(() => import("../List/Simple"));
/**
 * @param {Promise} addToCart
 */
const ProductItemSimple = ({
  product,
  stock,
  quantity,
  quickview,
  //
  clickPlus = (e) => {},
  clickMinus = (e) => {},
  addToCart = (e) => {},
  onChangeAttributeValues,
}) => {
  const {
    id,
    image,
    images,
    name,
    price,
    sale,

    brand,
    categories,

    description,
    detail,
    guide,
    url,
    attributes,
    stocks,
    _stocksMeta,
  } = product;

  const toast = useToast();
  const onToast = (content) =>
    toast({
      render: () => {
        return (
          <div
            style={{
              backgroundColor: `rgba(0,0,0,0.8)`,
              padding: 13,
              color: `#fff`,
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            {content}
          </div>
        );
      },
    });

  const router = useRouter();
  const row = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  });
  return (
    <Container maxW={"container.xl"}>
      <Breadcrumb
        spacing="8px"
        px={2}
        mb={4}
        mt={3}
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Heading} size="sm">
            Trang chủ
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NextLink href="/san-pham">
            <BreadcrumbLink href="">Sản phẩm</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box>
        <SimpleGrid
          templateRows="repeat(1, 1fr)"
          templateColumns={useBreakpointValue({
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          })}
          mb={34}
          //
          // borderWidth="1px"
          borderRadius="lg"
          boxShadow="lg"
          bg={"rgba(0,0,0,0.15)"}
        >
          <Box
            p={21}
            alignItems={"center"}
            justifyContent="center"
            alignItems={"center"}
            display={"flex"}
            pos={"relative"}
          >
            <Box
            // _before={{
            //   transition: "all .3s ease",
            //   content: '""',
            //   w: "full",
            //   h: "full",
            //   pos: "absolute",
            //   backgroundImage: `url(${encodeURI(image?.publicUrl)})`,
            //   backgroundRepeat: "no-repeat",
            //   filter: "blur(34px)",
            //   zIndex: 0,
            //   left: -40,
            // }}
            // _hover={{
            //   _before: {
            //     filter: "blur(55px)",
            //   },
            // }}
            >
              <Box
                rounded={"lg"}
                pos={"relative"}
                transition={"all 0.3s ease"}
                transform={"scale(1)"}
                _hover={{ transform: "scale(1.05)" }}
              >
                <Image
                  src={image?.publicUrl}
                  objectFit={"contain"}
                  width={1920}
                  height={1920}
                  // layout="responsive"
                />
              </Box>
            </Box>
          </Box>
          <Box d={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box p={21} pos={"relative"} zIndex={2} w={"full"}>
              <Grid
                templateColumns={row}
                templateRows="repeat(1, 1fr)"
                gap={2}
                px={2}
              >
                <GridItem colSpan={4}>
                  <Heading size={"md"} color={"brand.500"}>
                    {name}
                  </Heading>
                  <Divider my={21} />
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}>
                  <Stat mb={3}>
                    <StatLabel>
                      {categories?.map((category) => category.name).join(",")}
                    </StatLabel>
                    <StatLabel>{brand?.name}</StatLabel>

                    {sale ? (
                      <Fragment>
                        <StatNumber>{<Field>{sale}</Field>} ₫</StatNumber>
                        <StatHelpText textDecor={"line-through"}>
                          {<Field>{price}</Field>} ₫
                        </StatHelpText>
                      </Fragment>
                    ) : (
                      <StatNumber>{<Field>{price}</Field>} ₫</StatNumber>
                    )}
                    {quantity ? (
                      <StatLabel>Còn {quantity} sản phẩm</StatLabel>
                    ) : (
                      "Hết hàng"
                    )}
                  </Stat>
                  <ProductCartItemCreate
                    stock={stock}
                    product={product}
                    UI={ProductCartItemCreateQuick}
                    isDisabled={!quantity}
                  />

                  {/* <Button
                    leftIcon={<IoIosFlash />}
                    w={"full"}
                    mb={3}
                    bg={"brand.500"}
                    colorScheme={"yellow"}
                    isDisabled={isOutOfStock}
                    onClick={(e) => {
                      addToCart()
                        .then((data) => {
                          onToast("🎉 Đã thêm vào giỏ hàng");
                          router.push("/thanh-toan").then(() => {
                            // refetchProductCartItemList()();
                            // refetchProductCart()();
                          });
                        })
                        .catch(({ graphQLErrors }) => {
                          graphQLErrors?.map((error) => {
                            onToast(`⚠️ ${error.message}`);
                          });
                        });
                    }}
                  >
                    {isOutOfStock ? "Hết hàng" : "Mua nhanh"}
                  </Button> */}
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}>
                  <ProductAttributeListSimple
                    allProductAttributes={attributes}
                    onChange={onChangeAttributeValues}
                  />
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}>
                  <ProductCartItemCreate
                    product={product}
                    stock={stock}
                    UI={ProductCartItemCreateSimple}
                    isDisabled={!quantity}
                  />
                  {/* <Button
                    leftIcon={<AiOutlineShopping />}
                    w={150}
                    mb={3}
                    onClick={(e) => {
                      addToCart()
                        .then((data) => {
                          onToast("🎉 Đã thêm vào giỏ hàng");
                          onOpenCartVar()();
                          refetchProductCartItemList()();
                          refetchProductCart()();
                        })
                        .catch(({ graphQLErrors }) => {
                          graphQLErrors?.map((error) => {
                            onToast(`⚠️ ${error.message}`);
                          });
                        });
                    }}
                    bg={"brand.500"}
                    colorScheme={"yellow"}
                    isDisabled={isOutOfStock}
                  >
                    {isOutOfStock ? "Hết hàng" : "Thêm"}
                  </Button> */}
                </GridItem>
              </Grid>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
      <Box>
        <Tabs>
          <TabList>
            <Tab>Mô tả</Tab>
            <Tab>Chi tiết</Tab>
            <Tab>hướng dẫn</Tab>
            <Tab>Câu hỏi</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Field>{description}</Field>
            </TabPanel>
            {detail?.publicUrl && (
              <TabPanel>
                <Image width={1920} height={1920} src={detail?.publicUrl} />
              </TabPanel>
            )}

            <TabPanel>
              <Field>{guide}</Field>
            </TabPanel>
            <TabPanel>
              <FAQ UI={FAQSimple} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Products
        UI={ProductSimple}
        ProductWhereInput={{
          id_not: id,
          categories_some: {
            url_in: categories?.map((category) => category.url),
          },
        }}
      />
    </Container>
  );
};
export default ProductItemSimple;
