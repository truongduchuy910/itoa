import React, { useEffect, useMemo, useState } from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Icon,
  Fade,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Field from "../Field";
import Image from "next/image";
import BannerList from "@itoa/ui/Banner/List";
import { AiFillPlayCircle } from "react-icons/ai";
import Video from "./components/Video";
const BannerListUI = ({ allBanners }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const time = setTimeout(() => {
      console.log("tick");
      setCurrent((current) =>
        current < allBanners.length - 1 ? current + 1 : 0,
      );
    }, 4000);
    return () => {
      clearTimeout(time);
    };
  });
  return useMemo(
    () => (
      <Fade in={true}>
        <Image
          src={allBanners?.[current]?.image?.publicUrl || "/assets/img/no-image.png"}
          layout="fill"
          objectFit="contain"
        />
      </Fade>
    ),
    [allBanners, current],
  );
};
const KuttyHero = ({ page }) => {
  // const bg = useColorModeValue("white", "gray.800");
  return (
    <Box pos="relative" overflow="hidden" mt={2} my={4}>
      <Box maxW="7xl" mx="auto">
        <Box
          pos="relative"
          pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
          maxW={{ lg: "2xl" }}
          w={{ lg: "full" }}
          zIndex={1}
          border="solid 1px transparent"
          bg="white"
          shadow="lg"
        >
          <Icon
            display={{ base: "none", lg: "block" }}
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            h="full"
            w={48}
            color="white"
            transform="translateX(50%)"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </Icon>
          <Box
            mx="auto"
            maxW={{ base: "7xl" }}
            px={{ base: 4, sm: 6, lg: 8 }}
            mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
          >
            <Box
              w="full"
              textAlign={{ sm: "center", lg: "left" }}
              justifyContent="center"
              alignItems="center"
              pr={{ md: 4 }}
            >
              <Heading
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                lineHeight="short"
                fontWeight="extrabold"
                color={useColorModeValue("gray.900", "white")}
              >
                <chakra.span display={{ base: "block", xl: "inline" }}>
                  {page?.store}{" "}
                </chakra.span>
                <chakra.span
                  display={{ base: "block", xl: "inline" }}
                  color={useColorModeValue("brand.500", "brand.400")}
                >
                  {page?.slogan}
                </chakra.span>
              </Heading>
              <Text
                mt={{ base: 3, sm: 5, md: 5 }}
                fontSize={{ sm: "lg", md: "xl" }}
                maxW={{ sm: "xl" }}
                mx={{ sm: "auto", lg: 0 }}
                color="gray.500"
              >
                <Field>{page?.intro}</Field>
              </Text>
              <Box
                mt={{ base: 5, sm: 8 }}
                display={{ sm: "flex" }}
                justifyContent={{ sm: "center", lg: "start" }}
              >
                {page.youtube && (
                  <Video src={page.youtube} title={page.store} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        position={{ lg: "absolute" }}
        top={{ lg: 0 }}
        bottom={{ lg: 0 }}
        right={{ lg: 0 }}
        w={{ lg: "50%" }}
        border="solid 1px transparent"
        rounded="md"
        overflow="hidden"
      >
        <Box h={[56, 72, 96, "full"]} w="full" fit="cover">
          <BannerList UI={BannerListUI} />
        </Box>
      </Box>
    </Box>
  );
};

export default KuttyHero;
