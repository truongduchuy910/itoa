import React, { useEffect, useMemo, useState } from "react";
import { Text, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";


export default function CarouselSimpleCarousel({
  allBanners,
  _allBannersMeta,
  clickMore,
}) {
  const slides =
    allBanners?.map((banner) => {
      return { img: banner.image.publicUrl };
    }) || [];
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
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, []);

  return (
    <Flex
      w="full"
      bg={useColorModeValue("gray.200", "gray.600")}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" w="full" {...carouselStyle}>
          {slides?.map((slide, sid) => {
            const src = encodeURI(slide?.img.replace(/\/md/g, ""));
            return (
              <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
                <Image
                  src={src || "/assets/img/no-image.png"}
                  width={1640}
                  height={856}
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
        </Flex>
      </Flex>
    </Flex>
  );
}
