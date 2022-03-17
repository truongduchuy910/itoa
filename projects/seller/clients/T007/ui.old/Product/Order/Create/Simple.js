import { Fragment, useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";

// import Success from "../Create/Success";
import {
  Box,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  HStack,
  Input,
  Spacer,
} from "@chakra-ui/react";

import ProductCartItemListSimple from "@itoa/ui/Product/Cart/Item/List/Simple";

// import { onToast } from "../@itoa/ui/Toast/Simple";
import Field from "@itoa/ui/Field";
import ContactSimple from "@itoa/ui/Contact/Simple";
import { useRouter } from "next/router";
import Translate from "../../../Translate";
export default function ProductCartItemCheckout({
  ProductCart: productCart,
  page,
  setContact,
  payment,
  setPayment,
  setCode,
  onProductOrderCreate,
}) {
  const router = useRouter();
  var count = 0,
    total = page.shipMoneySupport || 0;
  productCart?.items?.map((item) => {
    count += item.quantity;
    total += item.quantity * (item.sale ? item.sale : item.price);
  });

  const contactSimple = useMemo(() => (
    <ContactSimple
      onChange={({ phone, name, address }) =>
        setContact({ phone, name, address })
      }
    />
  ));
  const productCartItems = useMemo(() => (
    <ProductCartItemListSimple allProductCartItems={productCart.items} />
  ));
  useEffect(() => {
    if (productCart?.items && !productCart?.items?.length) router.push("/");
  }, [productCart?.items?.length]);
  return (
    <Container maxW={"container.xl"} py={34}>
      {/* {createProductOrder ? <Success success={{ createProductOrder }} /> : null} */}
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 2, md: 2, lg: 3 }}
        spacing={4}
      >
        {contactSimple}
        <Stack
          spacing={4}
          borderWidth={"1px"}
          borderRadius={"lg"}
          boxShadow={"sm"}
          p={3}
          //
        >
          {page.shipMoneySupport && (
            <Fragment>
              <Translate as={Heading} size={"md"} content="Vận chuyển" />
              <Divider />

              <Box className="box mt-3 mb-4">
                <Field>{page.ship}</Field>
                <Field>{page.shipMoneySupport || 0}</Field>
              </Box>
            </Fragment>
          )}
          <Translate
            as={Heading}
            size={"md"}
            content="Thanh toán"
            variant="gradient-brand"
          />
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton
                onClick={() => {
                  setPayment(`cod`);
                }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight={payment === "cod" ? "bold" : "medium"}>
                    📦 Thanh toán khi nhận hàng (COD)
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                Bạn chỉ phải thanh toán khi nhận hàng. Thời gian giao hàng dự
                kiến từ 2-3 ngày.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton
                onClick={() => {
                  setPayment(`transfer`);
                }}
              >
                <Box flex="1" textAlign="left">
                  <Text fontWeight={payment === "transfer" ? "bold" : "medium"}>
                    🏦 Chuyển khoản ngân hàng
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <div pb={4}>
                  <Field>{page.transfer}</Field>
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>

        <Stack
          spacing={4}
          borderWidth={"1px"}
          borderRadius={"lg"}
          boxShadow={"sm"}
          p={3}
          //
        >
          <Translate
            as={Heading}
            size={"md"}
            content="Đơn hàng"
            variant="gradient-brand"
          />

          <Divider />
          <div className="box my-3">
            {productCartItems}
            <Flex>
              <Box>
                <Translate as={Heading} size={"xs"} content="Tạm tính" mb={2} />
                <Text>
                  <Field>{total - (page.shipMoneySupport || 0)}</Field> ₫
                </Text>
              </Box>
              <Spacer />
              {page.shipMoneySupport && (
                <Box mb={5}>
                  <Translate
                    as={Heading}
                    size={"xs"}
                    content="Vận chuyển"
                    mb={2}
                  />
                  <Text>
                    🚚 <Field>{page.shipMoneySupport}</Field> ₫
                  </Text>
                </Box>
              )}
            </Flex>
            <Input
              my={2}
              size="sm"
              label="Mã giảm giá"
              placeholder="Mã giảm giá"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <Box>
              <Translate as={Heading} size={"xs"} content="Tổng cộng" mb={2} />
              <Heading size="md" variant="gradient-brand">
                <Field>{total}</Field> ₫
              </Heading>
            </Box>
          </div>

          <Button
            onClick={(e) => {
              onProductOrderCreate().catch((e) => {
                // onToast()(e.toString().replace(/Error:/g, ""));
              });
            }}
            variant={"solid"}
            bg="brand.500"
            colorScheme={"brand"}
          >
            Đặt hàng
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
