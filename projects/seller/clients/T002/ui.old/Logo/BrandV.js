import {
  Box,
  Heading,
  Link,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useMemo } from "react";
export default function LogoBrandV({ src, name, w = 100, h, ...props }) {
  const fontSize =
    (useBreakpointValue({ base: 200, md: 250 }) * 1) / (name ? name.length : 1);
  return useMemo(() => {
    return (
      <NextLink href="/" passHref>
        <Link textDecor="none">
          <VStack>
            <Box
              width={w + "px"}
              height={(h || w) + "px"}
              rounded="full"
              overflow="hidden"
              p={0}
              shadow="md"
              pos="relative"
            >
              <Image
                src={src || "/assets/img/no-image.png"}
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Heading
              {...props}
              pt={1}
              textDecor="none"
              textTransform="uppercase"
              display="inline-block"
              fontSize={fontSize + "px"}
            >
              {name}
            </Heading>
          </VStack>
        </Link>
      </NextLink>
    );
  }, [src, name, w, h, fontSize]);
}
