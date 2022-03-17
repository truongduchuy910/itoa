import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tag } from "@chakra-ui/tag";
import { Fragment, useState } from "react";
import { formatMoney } from "../../../../../utils/chip";
const ProductCartItemUpdateSimple = ({
  productCartItem,
  quantity,
  onClickRemove,
  clickPlus,
  clickMinus,
  readOnly,
}) => {
  return (
    <Box mb={3}>
      <Flex borderWidth="1px" borderRadius="lg">
        <Box
          flex={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box pl={2}>
            <Image
              src={
                productCartItem.product?.image?.publicUrl.replace(
                  /\/md/g,
                  "/sm",
                ) || "/assets/img/no-image.png"
              }
              width={300}
              height={300}
              rounded="lg"
            />
          </Box>
        </Box>
        <Box
          flex={6}
          p={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box>
            <Stat>
              <StatLabel>
                {productCartItem.quantity}
                {" - "}
                {productCartItem.product?.name}
              </StatLabel>
              <StatNumber>
                {formatMoney(
                  (productCartItem.sale || productCartItem.price) *
                    productCartItem.quantity,
                )}{" "}
                ₫
              </StatNumber>
              <StatHelpText display={"inline-block"} mr={4}>
                {formatMoney(productCartItem.sale || productCartItem.price)} ₫
              </StatHelpText>
              {productCartItem.sale && (
                <Text textDecor={"line-through"} display={"inline-block"}>
                  {formatMoney(productCartItem.price)} ₫
                </Text>
              )}
            </Stat>
            <Box>
              {productCartItem?.stock?.attributeValues?.map((value) => (
                <Tag size={"xs"} key={value.id} bg={"transparent"} ml={1}>
                  {value.value}
                </Tag>
              ))}
            </Box>
            {!readOnly ? (
              <Fragment>
                <IconButton
                  icon={<MinusIcon />}
                  size={"xs"}
                  onClick={clickMinus}
                />
                <Text mx={2} display={"inline-block"}>
                  {quantity}
                </Text>
                <IconButton
                  icon={<AddIcon />}
                  size={"xs"}
                  onClick={clickPlus}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  size={"xs"}
                  float={"right"}
                  colorScheme={"yellow"}
                  bg={"brand.500"}
                  onClick={onClickRemove}
                />
              </Fragment>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
export default ProductCartItemUpdateSimple;
