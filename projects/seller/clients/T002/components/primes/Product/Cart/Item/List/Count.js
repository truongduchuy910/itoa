import { chakra } from "@chakra-ui/react";

export default function Count({ ProductCart: productCart }) {
  var count = 0;
  productCart.items.map((item) => {
    count += item.quantity;
  });
  return (
    <chakra.span
      pos="absolute"
      top="1px"
      right="-2px"
      px="6px"
      pt="2.5px"
      pb="3px"
      fontSize="13px"
      fontWeight="bold"
      lineHeight="none"
      color="red.100"
      transform="translate(50%,-50%)"
      bg="red.600"
      rounded="full"
    >
      {count}
    </chakra.span>
  );
}
