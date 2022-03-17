import { Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { IoIosFlash } from "react-icons/io";

export default function ProductCartItemCreateQuick({
  isDisabled,
  clickAddToCart,
  loading,
  error,
  data,
  quantity,
  clickMinus,
  clickPlus,
}) {
  const router = useRouter();
  return (
    <Button
      leftIcon={loading ? <Spinner size="xs" /> : <IoIosFlash />}
      w={"full"}
      mb={3}
      bg={"brand.500"}
      colorScheme={"yellow"}
      isDisabled={isDisabled}
      onClick={(e) => {
        clickAddToCart()?.finally(() => {
          router.push("/thanh-toan");
        });
      }}
    >
      {isDisabled ? "Hết hàng" : "Mua nhanh"}
    </Button>
  );
}
