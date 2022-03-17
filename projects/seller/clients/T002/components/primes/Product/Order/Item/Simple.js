import { Divider, Heading, Text } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { StatArrow } from "@chakra-ui/stat";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import Field from "../../../../Field";
import { formatMoney } from "../../../../utils/chip";
import ProductCartItemListSimple from "../../Cart/Item/List/Simple";

const ProductOrderItemSimple = ({
  id,
  items,
  contact,
  total,
  saving,
  createdAt,
  updatedAt,
  discount,
  payment,
}) => {
  return (
    <Box
      p={21}
      boxShadow={"lg"}
      borderWidth={"1px"}
      borderRadius={"lg"}
      background={useColorModeValue("white", "black")}
      mb={8}
      maxW={400}
    >
      <Heading size={"lg"} mb={5} textAlign={"center"}>
        🎉 Đơn Hàng
      </Heading>
      {/* <Text textAlign={"center"}>{id}</Text> */}
      <Text textAlign={"center"} mb={8}>
        {new Date(createdAt).toLocaleString("vi-VN")}
      </Text>

      <ProductCartItemListSimple allProductCartItems={items} readOnly />
      <SimpleGrid columns={2} spacing={3} mt={8}>
        <Stat>
          <StatLabel>{contact.name}</StatLabel>
          <StatHelpText>{contact.phone}</StatHelpText>
          <StatHelpText>{contact.address}</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>
            Thanh toán {payment === "transfer" ? "chuyển khoản" : "COD"}
          </StatLabel>
          <StatNumber>
            Tổng <Text color={"brand.500"}>{<Field>{total}</Field>} ₫</Text>
          </StatNumber>
          {saving > 0 ? (
            <StatHelpText>
              <StatArrow type="decrease" />
              Tiết kiệm {<Field>{saving}</Field>} ₫
            </StatHelpText>
          ) : null}
          {/*  */}
          <Text fontSize={"xs"}>
            {discount ? `đã áp dụng mã ${discount.code}` : null}
          </Text>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};
export default ProductOrderItemSimple;
