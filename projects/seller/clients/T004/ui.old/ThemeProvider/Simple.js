import {
  Box,
  Center,
  Circle,
  Fade,
  Heading,
  HStack,
  ScaleFade,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageProviderSimple({ bg, page = {} }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => {
      // clearTimeout(time);
    };
  });

  return (
    show && (
      <Center
        position={"fixed"}
        top={0}
        left={0}
        width={"100vw"}
        height={"100vh"}
        zIndex={9999}
        background={"white"}
      >
        <Fade in={page?.logo}>
          <VStack spacing={4}>
            {page?.logo && (
              <Circle size="fit-content">
                <Box height={100} width={100}>
                  <Image
                    src={page?.logo?.publicUrl || "/assets/img/no-image.png"}
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="contain"
                  />
                </Box>
              </Circle>
            )}
            <Heading textTransform="uppercase">{page.store}</Heading>
            <Text size="md">{page.slogan}</Text>
            <Spinner color="brand.500" />
          </VStack>
        </Fade>
      </Center>
    )
  );
}
