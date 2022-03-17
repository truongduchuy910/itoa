import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { chakra, IconButton } from "@chakra-ui/react";
import { Fragment } from "react";

export default function Component({ _allProductCartItemsMeta }) {
  var { count } = _allProductCartItemsMeta;
  return (
    <IconButton
      isRound
      colorScheme="brand"
      icon={
        <Fragment>
          <AiOutlineShoppingCart />
          <chakra.span
            pos="absolute"
            top={1}
            right="-1px"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            lineHeight="none"
            color="red.100"
            transform="translate(50%,-50%)"
            bg="red.600"
            rounded="full"
          >
            {count < 99 ? count : "99+"}
          </chakra.span>
        </Fragment>
      }
    />
  );
}
