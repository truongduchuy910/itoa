import { Heading, Text } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import { StatArrow } from "@chakra-ui/stat";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import Field from "@itoa/ui/Field";
import ProductCartItemListSimple from "@itoa/ui/Product/Cart/Item/List/Simple";
import Translate from "../../../Translate";

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
      <Translate as={Heading} content="Đơn Hàng" variant="gradient-brand" />
      <Text mb={8}>{new Date(createdAt).toLocaleString("vi-VN")}</Text>

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
