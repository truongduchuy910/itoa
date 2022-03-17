import { Button, IconButton, Spinner } from "@chakra-ui/react";
import { IoIosFlash } from "react-icons/io";

export default function ProductCartItemCreateSimple({
  isDisabled,
  clickAddToCart,
  loading,
  error,
  data,
}) {
  return (
    <IconButton
      icon={loading ? <Spinner size="xs" /> : <AiOutlineShopping />}
      onClick={(e) => {
        clickAddToCart();
      }}
      isDisabled={isDisabled}
    />
  );
}
