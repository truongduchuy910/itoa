import { Button, Heading, Spinner, Stack } from "@chakra-ui/react";

import { IoIosFlash } from "react-icons/io";
import Translate from "../../../../Translate";
import useToastSimple from "@itoa/ui/useToast/Simple";
import { onOpenCart } from "../List/Drawer";
import { useReactiveVar } from "@apollo/client";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
export default function ProductCartItemCreateQuick({
  isDisabled,
  clickAddToCart,
  loading,
  quantity,
  clickMinus,
  clickPlus,
}) {
  const router = useRouter();
  const toast = useToastSimple();
  return (
    <Stack>
      <Translate as={Heading} content="Mua nhanh" size="sm" />
      <Button
        leftIcon={loading ? <Spinner size="xs" /> : <IoIosFlash />}
        w={"full"}
        colorScheme={"brand"}
        isDisabled={isDisabled}
        onClick={(e) => {
          if (clickAddToCart) {
            clickAddToCart("/thanh-toan")
              .catch((message) => {
                toast({ description: message });
              })
              .then((res = {}) => {
                const { data, errors } = res;
                if (errors) toast({ description: errors.message });
              });
          }
        }}
      >
        {isDisabled ? "Hết hàng" : "Mua nhanh"}
      </Button>
    </Stack>
  );
}
