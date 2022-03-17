import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Center, HStack } from "@chakra-ui/layout";
import Image from "next/image";
import { useState } from "react";
import Controller from './Controller'

export default function SmallGallery({ srcs = [], objectFit = "cover" }) {
  const [src] = srcs;
  const [current, setCurrent] = useState(src);
  const [pos, setPos] = useState(0);
  const handleBack = (e) => {
    setPos((pos) => pos + 100);
  };
  const handleFoward = (e) => {
    setPos((pos) => pos - 100);
  };
  const clickImage = (image) => setCurrent(image);
  return (
    <Box>
      <Image
        src={current || "/assets/img/no-image.png"}
        width={3000}
        height={3000}
        objectPosition="center"
        objectFit={objectFit}
        layout="responsive"
      />
      <Box w="full" h={100} overflow="hidden" pos="relative" my={8}>
        {Boolean(pos) && (
          <Center pos="absolute" h="full" zIndex={1} left={0}>
            <IconButton
              size="sm"
              icon={<ArrowBackIcon />}
              onClick={handleBack}
            />
          </Center>
        )}
        <Center pos="absolute" h="full" zIndex={1} right={0}>
          {pos > -(srcs.length - 2) * 100 && (
            <IconButton
              size="sm"
              icon={<ArrowForwardIcon />}
              onClick={handleFoward}
            />
          )}
        </Center>

        <HStack
          w={srcs.length * 100}
          display="flex"
          flexDirection="row"
          transition="transform 500ms ease-in-out"
          style={{ transform: `translate(var(--chakra-translate-x),0)` }}
          translateX={pos}
        >
          {srcs?.map((image, i) => (
            <Box
              width={100}
              height={100}
              key={i}
              onClick={(e) => clickImage(image)}
            >
              <Image
                src={image || "/assets/img/no-image.png"}
                width={100}
                height={100}
                objectPosition="center"
                objectFit="contain"
                layout="responsive"
              />
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
