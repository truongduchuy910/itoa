import { Button, Heading, HStack, Input, Spinner } from "@chakra-ui/react";
import { Fragment } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { onOpenCart } from "../List/Drawer";

export default function ProductCartItemCreateSimple({
  isDisabled,
  clickAddToCart,
  loading,
  error,
  data,
  quantity,
  clickMinus,
  clickPlus,
}) {
  return (
    <Fragment>
      <Heading size={"sm"} mb={4}>
        Thêm vào giỏ hàng
      </Heading>
      <HStack mb={2}>
        <Button onClick={clickMinus}>-</Button>
        <Input
          textAlign={"center"}
          value={quantity}
          readOnly
          isDisabled={loading}
        />
        <Button onClick={clickPlus}>+</Button>
      </HStack>
      <Button
        leftIcon={loading ? <Spinner size="xs" /> : <AiOutlineShopping />}
        w={"full"}
        mb={3}
        onClick={(e) =>
          clickAddToCart()?.finally(() => {
            onOpenCart(true);
          })
        }
        bg={"brand.500"}
        colorScheme={"yellow"}
        isDisabled={isDisabled}
      >
        {isDisabled ? "Hết hàng" : "Thêm"}
      </Button>
    </Fragment>
  );
}
