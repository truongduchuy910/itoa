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
import { ChevronRightIcon, ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
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
              <Heading
                textTransform="capitalize"
                size={size}
                ml="2"
                // scale="1"
                transform="auto"
                _hover={{
                  // scale: "1.1",
                  borderBottom: "1px solid",
                }}
              >
                {name}
              </Heading>
            </LinkOverlay>
          </NextLink>
          {/* <Spacer />
          {withBtn && Boolean(childs) && (
            <IconButton
              display={{ base: "none", md: "block" }}
              onClick={clickBtn}
              icon={!isOpen ? <ChevronRightIcon /> : <ChevronDownIcon />}
              variant="ghost"
              size="sm"
            />
          )} */}
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
  bgImage,
}) {
  return (
    <Box boxSize="full" pos="relative">
      <Box mr={2}>
        <HStack pl={2} pb={5} pt={3}>
          {/* <Image
            src={bgImage}
            unoptimized
            layout="fixed"
            objectFit="contain"
            width={65}
            height={50}
          /> */}
          <StarIcon color="yellow.400" fontSize="2xl" mr={2} />
          <Heading
            size="lg"
            textTransform="capitalize"
            letterSpacing={2}
            {...headerProps}
          >
            <Translate content="Danh mục" />
          </Heading>
        </HStack>
        <List childs={allProductCategories} ml={-6} size={size} />
      </Box>
    </Box>
  );
}
