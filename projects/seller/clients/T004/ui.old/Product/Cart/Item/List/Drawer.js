import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import { useRef } from "react";
import ProductCartItemListSimple from "../List/Simple";
import { Fragment } from "react";
import NextLink from "next/link";
import { makeVar, useReactiveVar } from "@apollo/client";
import Translate from "@itoa/ui/Translate";
export const onOpenCart = makeVar(false);
export default function ProductCartItemListDrawer({
  allProductCartItems,
  _allProductCartItemsMeta,
  refetch,
  loading,
  count,
  toggleButton: ToggleButton = () => "",
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
      <Box ref={btnRefCart} onClick={onOpen}>
        <ToggleButton
          allProductCartItems={allProductCartItems}
          _allProductCartItemsMeta={_allProductCartItemsMeta}
          refetch={refetch}
          loading={loading}
          count={count}
        />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRefCart}
      >
        <DrawerOverlay zIndex="overlay">
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Translate
                as={Heading}
                size="md"
                variant="gradient-brand"
                content={"Giỏ hàng"}
              />
            </DrawerHeader>
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
                  colorScheme={"brand"}
                  bg={"brand.500"}
                  as="a"
                >
                  <Translate content="Thanh toán" />
                </Button>
              </NextLink>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Fragment>
  );
}
