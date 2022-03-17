import {
  Box,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export default function LogoBrandH({ src, name = "", w = 300, h, ...props }) {
  console.log(props);
  const fontSize =
    (useBreakpointValue({ base: 200, md: 250, lg: 300 }) * 1) /
    (name ? name.length : 1);
  return (
    <LinkBox>
      <HStack>
        <Box
          width={w + "px"}
          height={(h || w) + "px"}
          // rounded="full"
          pos="relative"
          overflow="hidden"
          p={0}

          // shadow="md"
        >
          <Image
            src={src || "/assets/img/no-image.png"}
            quality={100}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <NextLink href="/" passHref>
          <LinkOverlay>
            <Heading
              {...props}
              textDecor="none"
              textTransform="uppercase"
              display="inline-block"
              isTruncated
              fontSize={fontSize + "px"}
            >
              {name}
            </Heading>
          </LinkOverlay>
        </NextLink>
      </HStack>
    </LinkBox>
  );
}
