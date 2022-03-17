import { Image } from "@chakra-ui/image";
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
import { formatMoney } from "../../../utils/chip";
import { Fragment } from "react";
import Products from "../List";
import ProductAttributeListSimple from "../Attribute/List/Simple";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosFlash } from "react-icons/io";
import { useRouter } from "next/router";
import { onOpenCartVar } from "../../../frames/Infomation/Navbar";
import { refetchProductCartItemList } from "../Cart/Item/List";
import { refetchProductCart } from "../Cart";
import Field from "../../../Field";
const ProductSimple = dynamic(() => import("../List/Simple"));
/**
 * @param {Promise} addToCart
 */
const ProductItemSimple = ({
  product: {
    id,
    image,
    images,
    name,
    price,
    sale,
    isOutOfStock,
    status,
    brand,
    categories,
    _categoriesMeta,
    description,
    detail,
    guide,
    url,
    attributes,
    _attributesMeta,
    stocks,
    _stocksMeta,
  },
  quantity,
  quickview,
  //
  clickPlus = (e) => {},
  clickMinus = (e) => {},
  addToCart = (e) => {},
  onChangeAttributeValues = (values = []) => {},
}) => {
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
  var count = 0;
  stocks?.map((stock) => (count += stock?.quantity));
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
          <BreadcrumbLink>Trang chủ</BreadcrumbLink>
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
              _before={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                // backgroundImage: `url(${image?.publicUrl})`,
                backgroundRepeat: "no-repeat",
                filter: "blur(34px)",
                zIndex: 0,
                left: -40,
              }}
              _hover={{
                _before: {
                  filter: "blur(55px)",
                },
              }}
            >
              {image?.publicUrl && (
                <Image
                  pos={"relative"}
                  rounded={"lg"}
                  objectFit={"cover"}
                  src={

                    (image?.publicUrl || "/assets/img/no-image.png")
                  }
                  transition={"all 0.3s ease"}
                  transform={"scale(1)"}
                  _hover={{ transform: "scale(1.05)" }}
                />
              )}
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
                        <StatNumber>{formatMoney(sale)} ₫</StatNumber>
                        <StatHelpText textDecor={"line-through"}>
                          {formatMoney(price)} ₫
                        </StatHelpText>
                      </Fragment>
                    ) : (
                      <StatNumber>{formatMoney(price)} ₫</StatNumber>
                    )}
                    {count ? <StatLabel>Còn {count} sản phẩm</StatLabel> : null}
                  </Stat>
                  <Button
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
                            refetchProductCartItemList()();
                            refetchProductCart()();
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
                  </Button>
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}>
                  <ProductAttributeListSimple
                    allProductAttributes={attributes}
                    onChange={onChangeAttributeValues}
                  />
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 1 }}>
                  <Heading size={"sm"} mb={4}>
                    Thêm vào giỏ hàng
                  </Heading>
                  <HStack mb={2} maxW={150}>
                    <Button onClick={clickMinus}>-</Button>
                    <Input textAlign={"center"} value={quantity} readOnly />
                    <Button onClick={clickPlus}>+</Button>
                  </HStack>
                  <Button
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
                  </Button>
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
            <TabPanel>
              <Image
                src={

                  (detail?.publicUrl || "/assets/img/no-image.png")
                }
              />
            </TabPanel>
            <TabPanel>
              <Field>{guide}</Field>
            </TabPanel>
            <TabPanel>
              <FAQ UI={FAQSimple} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Grid
        templateColumns={row}
        templateRows="repeat(1, 1fr)"
        gap={{ base: 2, md: 4 }}
        px={2}
        py={24}
      >
        <Products
          UI={ProductSimple}
          ProductWhereInput={{
            id_not: id,
            categories_some: {
              url_in: categories?.map((category) => category.url),
            },
          }}
        />
      </Grid>
    </Container>
  );
};
export default ProductItemSimple;
