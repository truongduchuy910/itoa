import { gql, useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Square,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import Field from "@itoa/ui/Field";

export default function ProductCartItemItemUpdateLak({
  // item,
  // deleteProdcutCartItem,
  // refetch,
  // onClickProduct,
  //
  productCartItem,
  quantity,
  onClickRemove,
  clickPlus,
  clickMinus,
  readOnly,
  error,
}) {
  const price =
    (productCartItem.sale ? productCartItem.sale : productCartItem.price) *
    quantity;
  return (
    <Fragment>
      <Grid
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={2}
        w="full"
      >
        <GridItem colSpan={{ base: 2, md: 1 }} rowSpan={{ base: 2, md: 2 }}>
          <Image
            width={100}
            height={100}
            layout="intrinsic"
            objectFit="contain"
            src={

              (productCartItem.product?.image?.publicUrl.replace(
                /\/md/g,
                "/sm",
              ) || "/assets/img/no-image.png")
            }
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={1}>
          <Box>
            <Heading size="xs">{productCartItem.product.name}</Heading>

            {productCartItem.sale ? (
              <Fragment>
                <Text>{<Field>{productCartItem.sale}</Field>}₫</Text>
                <Text className="variant_title old">
                  {<Field>{productCartItem.price}</Field>}₫
                </Text>
              </Fragment>
            ) : (
              <Text style={{ marginBottom: 8 }}>
                {<Field>{productCartItem.price}</Field>}₫
              </Text>
            )}
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 2 }} rowSpan={{ base: 2, md: 1 }}>
          <Box>
            <HStack>
              <Button size="xs" onClick={clickMinus} rounded={"none"}>
                -
              </Button>
              <Text>{quantity}</Text>
              <Button size="xs" onClick={clickPlus} rounded={"none"}>
                +
              </Button>
            </HStack>
            <Text mt={2} fontWeight="bold">
              {<Field>{price}</Field>}₫
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 3 }} rowSpan={1}>
          <HStack>
            {productCartItem.stock?.attributeValues?.map((variable) => {
              return (
                <Text className="var" key={variable.id}>
                  {variable.value}
                </Text>
              );
            })}
          </HStack>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 1 }} rowSpan={{ base: 2, md: 1 }}>
          <IconButton size="xs" onClick={onClickRemove} icon={<DeleteIcon />} />
        </GridItem>
      </Grid>
      <style jsx>{`
        div,
        b {
          font-size: 14px;
        }
        input {
          margin: 0;
          font: inherit;
          color: inherit;
        }
        input::-moz-focus-inner {
          padding: 0;
          border: 0;
        }
        input {
          line-height: normal;
        }

        * {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        :after,
        :before {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        input {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        input {
          outline: medium none;
          color: #434343;
        }
        *::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        input[type="text"] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        .thumb-cart {
          display: flex;
          align-items: center;
          max-width: 400px;
        }
        .var {
          margin-right: 13px;
          text-decoration: underline;
        }
        .thumb-cart > a {
        }
        .ip {
          margin-bottom: 12px;
          width: 100%;
          border-radius: 21px;
          border: 1px solid #eee;
          padding-left: 13px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px !important;
          opacity: 0.6;
        }
        a {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        a:focus {
          text-decoration: none;
          outline: none;
        }
        a:focus,
        a:hover {
          text-decoration: none;
          color: #86590d;
        }
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .table.table-cart {
          border-color: #eee;
          border-bottom: 1px solid #eee;
        }
        .table.table-cart tr {
          border-color: #eee;
        }
        .table.table-cart th {
          font-size: 14px;
          color: #333;
          text-align: left;
          font-weight: 400;
          border-color: #eee;
          padding: 10px 0;
        }
        .table.table-cart td {
          font-size: 16px;
          color: #1c1c1c;
          text-align: left;
          vertical-align: middle;
          padding: 10px 0;
          border-color: #eee;
        }

        .table.table-cart td a.remove-item {
          font-size: 16px;
          color: #000;
          text-align: left;
        }
        .table.table-cart td b {
          font-size: 16px;
          color: #1c1c1c;
        }

        @media print {
          *,
          :after,
          :before {
            color: #000 !important;
            text-shadow: none !important;
            background: 0 0 !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
          }
        }
        a,
        input {
          outline: medium none;
          color: #434343;
        }
        .table.table-cart td .thumb-cart:after {
          content: "";
          display: table;
          clear: both;
        }
        .table.table-cart td .thumb-cart img {
          float: left;
        }
        .table.table-cart td .thumb-cart h4 {
          font-size: 16px;
          color: #000;
          text-align: left;
          margin: 0;
          padding-top: 30px;
          margin-bottom: 10px;
        }
        .table.table-cart td .thumb-cart span {
          font-size: 13px;
          color: #000;
          text-align: left;
          display: block;
        }
        @media (max-width: 480px) {
          .calculate-area .ct-ft-cart {
            margin-bottom: 0px;
          }
          .table.table-cart td .thumb-cart img {
            float: none;
          }
          .qty-number input {
            padding: 0;
          }
          .table.table-cart td .thumb-cart h4 {
            padding: 0;
            margin-top: 10px;
            font-size: 14px;
          }
          span {
            margin-bottom: 13px;
          }
          .table.table-cart td .thumb-cart span {
            font-size: 13px;
          }
          .table.table-cart th,
          .table.table-cart td {
            max-width: 125px;
          }
          .qty-number input[type="button"] {
            width: 20px;
            border: 0;
          }
        }
        .qty-number {
          border-radius: 50px;
          overflow: hidden;
          display: inline-block;
          border: none;
          width: 100px;
        }
        .qty-number:after {
          content: "";
          display: table;
          clear: both;
        }
        .qty-number input {
          border: 0;
          border-left: 1px solid #eee;
          outline: none;
          text-align: center;
          float: left;
          border-right: 1px solid #eee;
          background: #fff;
        }
        .qty-number input[type="button"] {
          width: 20px;
          border: 0;
        }
        @media only screen and (max-width: 767px) {
          .table-cart-area {
            text-align: center;
          }
          .button-action a {
            display: block;
            margin-bottom: 15px;
          }
        }

        @media (max-width: 320px) {
          .table.table-cart th,
          .table.table-cart td {
            max-width: 100px;
          }
        }
      `}</style>
    </Fragment>
  );
}
