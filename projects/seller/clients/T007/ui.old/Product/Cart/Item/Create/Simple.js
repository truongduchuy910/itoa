import {
  Button,
  Heading,
  HStack,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";
import Translate from "../../../../Translate";
import useToastSimple from "@itoa/ui/useToast/Simple";
import { onOpenCart } from "../List/Drawer";
import { useReactiveVar } from "@apollo/client";

export default function ProductCartItemCreateSimple({
  isDisabled,
  clickAddToCart,
  loading,
  quantity,
  clickMinus,
  clickPlus,
}) {
  const toast = useToastSimple();

  return (
    <Stack>
      <Translate as={Heading} content="Thêm vào giỏ hàng" size="sm" />
      <HStack>
        <Button onClick={clickMinus} size={"sm"}>
          -
        </Button>
        <Input
          textAlign={"center"}
          size={"sm"}
          value={quantity}
          readOnly
          isDisabled={loading}
        />
        <Button onClick={clickPlus} size={"sm"}>
          +
        </Button>
      </HStack>
      <Button
        leftIcon={loading ? <Spinner size="xs" /> : <AiOutlineShopping />}
        w={"full"}
        onClick={(e) => {
          if (clickAddToCart) {
            clickAddToCart(false)
              .catch((message) => {
                toast({ description: message });
              })
              .then((res = {}) => {
                const { data, errors } = res;
                if (errors) toast({ description: errors.message });
              });
          }
        }}
        colorScheme={"brand"}
        isDisabled={isDisabled}
      >
        {isDisabled ? "Hết hàng" : "Thêm"}
      </Button>
    </Stack>
  );
}
