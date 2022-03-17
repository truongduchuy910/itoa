import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tag } from "@chakra-ui/tag";
import { Fragment, useState } from "react";
import Field from "../../../../../Field";
import ProductCartItemDelete from "../Delete";
import ProductCartItemDeleteSimple from "../Delete/Simple";
import ProductCartItemUpdate from "../Update";
import ProductCartItemUpdateSimple from "../Update/Simple";
export default function ProductCartItemItemSimple({
  productCartItem,
  quantity,
  onClickRemove,
  clickPlus,
  clickMinus,
  readOnly,
  update,
}) {
  return (
    <Box mb={3}>
      <Flex borderWidth="1px" borderRadius="lg">
        <Box
          flex={4}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box pl={2} rounded="lg">
            <Image
              src={
                productCartItem.product?.image?.publicUrl ||
                "/assets/img/no-image.png"
              }
              width={300}
              height={300}
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
                {
                  <Field>
                    {(productCartItem.sale || productCartItem.price) *
                      productCartItem.quantity}
                  </Field>
                }{" "}
                ₫
              </StatNumber>
              <StatHelpText display={"inline-block"} mr={4}>
                {<Field>{productCartItem.sale || productCartItem.price}</Field>}{" "}
                ₫
              </StatHelpText>
              {productCartItem.sale && (
                <Text textDecor={"line-through"} display={"inline-block"}>
                  {<Field>{productCartItem.price}</Field>} ₫
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
                {/* <IconButton
                  icon={<MinusIcon />}
                  size={"xs"}
                  onClick={clickMinus}
                  rounded="md"
                />
                <Text mx={2} display={"inline-block"}>
                  {quantity}
                </Text>
                <IconButton
                  icon={<AddIcon />}
                  size={"xs"}
                  onClick={clickPlus}
                  rounded="md"
                /> */}
                {/* <IconButton
                  icon={<DeleteIcon />}
                  size={"xs"}
                  float={"right"}
                  colorScheme={"yellow"}
                  bg={"brand.500"}
                  onClick={(e) => onClickRemove(productCartItem.id)}
                  rounded="md"
                /> */}
                <ProductCartItemUpdate
                  UI={ProductCartItemUpdateSimple}
                  productCartItem={productCartItem}
                />
                <ProductCartItemDelete
                  UI={ProductCartItemDeleteSimple}
                  productCartItem={productCartItem}
                />
                {/* {update.loading && <Spinner size="xs" ml={2} />} */}
              </Fragment>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
