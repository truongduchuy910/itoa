import Image from "next/image";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/layout";

import FAQ from "../../FAQ";
import FAQSimple from "../../FAQ/Simple";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import dynamic from "next/dynamic";
import { Fragment, useState } from "react";
import Products from "../List";
import ProductAttributeListSimple from "../Attribute/List/Simple";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosFlash } from "react-icons/io";
import { useRouter } from "next/router";
import { onOpenCartVar } from "../../../frames/Infomation/Navbar";
// import { refetchProductCartItemList } from "../Cart/Item/List";
// import { refetchProductCart } from "../Cart";
import Field from "@itoa/ui/Field";
import ProductCartItemCreate from "@itoa/ui/Product/Cart/Item/Create";
import ProductCartItemCreateSimple from "@itoa/ui/Product/Cart/Item/Create/Simple";
import ProductCartItemCreateQuick from "@itoa/ui/Product/Cart/Item/Create/Quick";
const ProductListNoPrice = dynamic(() =>
  import("@itoa/ui/Product/List/NoPrice"),
);
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

  const [current, setCurrent] = useState({ file: image });
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
          <BreadcrumbLink>Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NextLink href="/san-pham">
            <BreadcrumbLink href="">Sản phẩm</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: 2, md: 2, lg: 3 }}
        mb={{ base: 2, md: 2, lg: 3 }}
      >
        <Box>
          <Box pos="sticky" top={75}>
            <Box
              rounded={"lg"}
              transition={"all 0.3s ease"}
              transform={"scale(1)"}
              _hover={{ transform: "scale(1.05)" }}
              overflow="hidden"
              w="full"
              pb="100%"
            >
              {image?.publicUrl && (
                <Image
                  src={current?.file?.publicUrl}
                  objectFit={"contain"}
                  layout="fill"
                />
              )}
            </Box>
            <Heading color="brand.500" my={10}>
              {name}
            </Heading>
          </Box>
        </Box>
        <Box>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            gap={{ base: 2, md: 2, lg: 3 }}
          >
            {images?.map((image, i) => {
              return (
                <Box
                  key={i}
                  rounded={"lg"}
                  pos={"relative"}
                  transition={"all 0.3s ease"}
                  transform={"scale(1)"}
                  _hover={{ transform: "scale(1.05)" }}
                  overflow="hidden"
                  w="full"
                  pb="100%"
                >
                  {image?.file?.publicUrl && (
                    <Image
                      onClick={(e) => setCurrent(image)}
                      src={image?.file?.publicUrl}
                      objectFit={"cover"}
                      layout="fill"
                    />
                  )}
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      </SimpleGrid>

      <Box py={10}>
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
        UI={ProductListNoPrice}
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
