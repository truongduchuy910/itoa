import React from "react";
import {
  chakra,
  Icon,
  Flex,
  useColorModeValue,
  useToken,
  IconButton,
  Spinner,
} from "@chakra-ui/react";

export default function Component({
  allProductCartItems,
  _allProductCartItemsMeta = {},
  refetch,
  loading,
  count = 0,
  ...props
}) {
  const [red500, brand600] = useToken("colors", ["#F7E57E", "#FFECC2"]);

  const gradient = (
    <chakra.svg w={0} h={0} pos="absolute" aria-hidden="true" focusable="false">
      <linearGradient id="gradient" x2="1" y2="1">
        <stop offset="0%" stopColor="#A46E29" />
        <stop offset="50%" stopColor={red500} />
        <stop offset="full" stopColor={brand600} />
      </linearGradient>
    </chakra.svg>
  );
  return (
    <Flex justifyContent="center" alignItems="center">
      <chakra.span pos="relative" display="inline-block" m={1}>
        {gradient}

        <IconButton
          shadow="lg"
          bg="brand.600"
          size="sm"
          colorScheme="brand"
          icon={
            <Icon
              boxSize={5}
              fill="none"
              stroke="url(#gradient) #447799;"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                clipRule="evenodd"
              ></path>
            </Icon>
          }
          {...props}
        />

        <chakra.span
          pos="absolute"
          top="-1px"
          right="-1px"
          px={1}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          lineHeight="none"
          color="red.100"
          transform="translate(50%,-50%)"
          bg="red.600"
          rounded="full"
        >
          {loading ? <Spinner size="xs" /> : count < 99 ? count : "99+"}
        </chakra.span>
      </chakra.span>
    </Flex>
  );
}
