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
  Input,
} from "@chakra-ui/react";

import ProductCartItemListSimple from "../../Cart/Item/List/Simple";

import { onToast } from "../../../../elements/Toast/Simple";
import Field from "../../../../Field";
import ContactSimple from "../../../Contact/Simple";
import { useRouter } from "next/router";
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

  return (
    <Container maxW={"container.xl"} py={34}>
      {/* {createProductOrder ? <Success success={{ createProductOrder }} /> : null} */}
      <SimpleGrid
        alignItems={"start"}
        columns={{ base: 1, md: 2, lg: 3 }}
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
              <Heading size={"md"}>Vận chuyển</Heading>
              <Divider />

              <Box className="box mt-3 mb-4">
                <Field>{page.ship}</Field>
                <Field>{page.shipMoneySupport || 0}</Field>
              </Box>
            </Fragment>
          )}
          <Heading size={"md"}>Thanh toán</Heading>
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
          <Heading size={"md"}>
            Đơn hàng <small>({count} sản phẩm)</small>
          </Heading>
          <Divider />
          <div className="box my-3">
            {productCartItems}
            <Box>
              Tạm tính:{" "}
              <Text style={{ float: "right" }}>
                <Field>{total - (page.shipMoneySupport || 0)}</Field> ₫
              </Text>
            </Box>
            <Box mb={5}>
              Vận chuyển:{" "}
              <Text style={{ float: "right" }}>
                🚚 <Field>{page.shipMoneySupport}</Field> ₫
              </Text>
            </Box>
            <Input
              label="Mã giảm giá"
              placeholder="Mã giảm giá"
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <h6 style={{ marginTop: 34 }}>
              Tổng cộng:{" "}
              <Text
                style={{ float: "right", color: "var(--color-text-danger)" }}
              >
                <Field>{total}</Field> ₫
              </Text>
            </h6>
          </div>
          <a onClick={() => onClickCart()}>Quay về giỏ hàng</a>
          <Button
            onClick={(e) => {
              onProductOrderCreate().catch((e) => {
                onToast()(e.toString().replace(/Error:/g, ""));
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
