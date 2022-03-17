import {
  Box,
  Divider,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
} from "@chakra-ui/layout";
import Translate from "../../../Translate";
import Card from "@itoa/ui/Card";
import Image from "next/image";
import { IconButton } from "@chakra-ui/button";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";
function Item({
  ml = 0,
  name,
  url,
  src,
  withBtn = true,
  childs,
  size,
  variant,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const clickBtn = () => setIsOpen((isOpen) => !isOpen);
  return (
    <Card ml={ml} variant={variant}>
      <LinkBox>
        <HStack py={2} pl={4}>
          {typeof src === "string" ? (
            <Image width={30} height={30} src={src || "/assets/img/no-image.png"} />
          ) : (
            src
          )}
          <NextLink href={`/san-pham/${url || ""}`} passHref>
            <LinkOverlay>
              <Heading textTransform="capitalize" size={size}>
                {name}
              </Heading>
            </LinkOverlay>
          </NextLink>
          <Spacer />
          {withBtn && Boolean(childs) && (
            <IconButton
              display={{ base: "none", md: "block" }}
              onClick={clickBtn}
              icon={!isOpen ? <ChevronRightIcon /> : <ChevronDownIcon />}
              variant="ghost"
              size="sm"
            />
          )}
        </HStack>
      </LinkBox>
      <Divider />
      {isOpen && (
        <Box borderLeftWidth={1}>
          <List childs={childs} ml={ml} />
        </Box>
      )}
    </Card>
  );
}
function List({ childs, ml, size }) {
  return (
    Boolean(childs) &&
    childs?.map((category) => {
      return (
        <Item
          {...category}
          size={size}
          ml={ml + 4}
          childs={category.childs}
          key={category.id}
          src={category?.file?.publicUrl}
          name={category.name}
        />
      );
    })
  );
}
export default function ProductCategoryListWithImage({
  allProductCategories,
  bg,
  size = "xs",
  headerProps,
}) {
  return (
    <Box boxSize="full">
      <Box bg={bg} mr={2}>
        <Translate
          as={Heading}
          textTransform="capitalize"
          py={2}
          letterSpacing={2}
          content="Danh mục"
          {...headerProps}
        />
        <List childs={allProductCategories} ml={-6} size={size} />
      </Box>
    </Box>
  );
}
