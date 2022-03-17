import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import ProductCartItemListSimple from "../List/Simple";
import { Fragment } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import NextLink from "next/link";
import { makeVar, useReactiveVar } from "@apollo/client";
export const onOpenCart = makeVar(false);
export default function ProductCartItemListDrawer({
  allProductCartItems,
  refetch,
  loading,
}) {
  const btnRefCart = useRef();
  const onOpen = (e) => {
    onOpenCart(true);
  };
  const onClose = (e) => {
    onOpenCart(false);
  };
  const isOpen = useReactiveVar(onOpenCart);
  return (
    <Fragment>
      <IconButton
        icon={loading ? <Spinner size="xs" /> : <AiOutlineShopping />}
        fontSize={"lg"}
        fontWeight={600}
        ref={btnRefCart}
        rounded="md"
        onClick={onOpen}
        bg={"brand.500"}
        colorScheme={"yellow"}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRefCart}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Giỏ hàng của bạn</DrawerHeader>
            <DrawerBody>
              <ProductCartItemListSimple
                allProductCartItems={allProductCartItems}
                refetch={refetch}
              />
            </DrawerBody>
            <DrawerFooter>
              <NextLink href={`/thanh-toan`} passHref>
                <Button
                  onClick={onClose}
                  w={"full"}
                  colorScheme={"yellow"}
                  bg={"brand.500"}
                  as="a"
                >
                  Thanh toán
                </Button>
              </NextLink>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
}
