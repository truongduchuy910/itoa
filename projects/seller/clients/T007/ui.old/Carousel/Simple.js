import React, { useEffect, useMemo, useState } from "react";
import { Text, Box, Flex, useColorModeValue, HStack } from "@chakra-ui/react";
import Image from "next/image";


export default function CarouselSimpleCarousel({
  allBanners,
  _allBannersMeta,
  clickMore,
}) {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };
  var slides =
    allBanners?.map((banner) => {
      return { img: banner.image.publicUrl };
    }) || [];
  // slides = [...slides, ...slides];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${(100 / slidesCount) * currentSlide}%`,
  };

  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";

  // useEffect(() => {
  //   const automatedSlide = setInterval(() => {
  //     ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
  //   }, SLIDES_INTERVAL_TIME);
  //   return () => clearInterval(automatedSlide);
  // }, []);

  return (
    <Box pos="relative" overflow="hidden" w="full">
      <HStack w={slidesCount * 100 + "%"} spacing={0}>
        {slides?.map((slide, sid) => {
          const src = slide?.img;
          return (
            <Box
              {...carouselStyle}
              key={`slide-${sid}`}
              shadow="md"
              h="full"
              w={100 / slidesCount + "%"}
              bg="blackAlpha.100"
            >
              <Image
                src={src || "/assets/img/no-image.png"}
                width={720}
                height={300}
                layout="responsive"
                objectFit="cover"
                loading="eager"
              />

              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
                whiteSpace="nowrap"
                bg="gray"
              >
                {sid + 1} / {slidesCount}
              </Text>
            </Box>
          );
        })}
      </HStack>
      <Text {...arrowStyles} left="0" onClick={prevSlide}>
        &#10094;
      </Text>
      <Text {...arrowStyles} right="0" onClick={nextSlide}>
        &#10095;
      </Text>
    </Box>
  );
}
