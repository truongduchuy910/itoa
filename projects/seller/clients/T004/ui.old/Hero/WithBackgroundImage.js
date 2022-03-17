import React from "react";
import {
  useBreakpointValue,
  Flex,
  Center,
  Heading,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Translate from "../Translate";
import Image from "next/image";

const KuttyHero = ({ page }) => {
  const objectFit = "cover";
  const [banner = {}] = page?.banners;
  return (
    <header>
      <Center
        w="full"
        h="50vh"
        bgPos="center"
        bgSize="contain"
        align="center"
        pos="relative"
      >
        <Image
          src={banner.image ? banner.image?.publicUrl : "/assets/img/no-image.png"}
          layout="fill"
          objectFit={objectFit}
        />
        <Center align="center" pos="relative" boxSize="full">
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <Heading
              p={4}
              bg="blackAlpha.700"
              fontSize={["2xl", , "3xl"]}
              fontWeight="semibold"
              color="white"
              textTransform="uppercase"
            >
              {page?.store}{" "}
              <Text as="span" color="blue.400">
                {page?.slogan}
              </Text>
            </Heading>
            {/* <Button
              colorScheme="brand"
              textTransform="uppercase"
              w="fit-content"
            >
              <Translate content="Sản phẩm" />
            </Button> */}
          </Stack>
        </Center>
      </Center>
    </header>
  );
};

export default KuttyHero;
