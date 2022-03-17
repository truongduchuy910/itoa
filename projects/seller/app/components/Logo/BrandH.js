import {
  Box,
  Heading,
  HStack,
  LinkBox,
  Circle,
  LinkOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Controller from './Controller'

export default function LogoBrandH({
  src,
  name = "",
  w = 300,
  h,
  variant,
  size,
  logoBg,
  bgLogoGradient,
  ...props
}) {
  const fontSize =
    (useBreakpointValue({ base: 200, md: 250, lg: 300 }) * 1) /
    (name ? name.length : 1);
  return (
    <LinkBox>
      <HStack>
        <Circle bg={logoBg} bgGradient={bgLogoGradient}>
          <Image
            src={src || "/assets/img/no-image.png"}
            width={w}
            height={w}
            // quality={100}
            layout="fixed"
            objectFit="contain"
          />
        </Circle>
        <NextLink href="/" passHref>
          <LinkOverlay>
            <Heading
              textDecor="none"
              textTransform="uppercase"
              display="inline-block"
              isTruncated
              variant={variant}
              size={size}
              py={2}
            >
              {name}
            </Heading>
          </LinkOverlay>
        </NextLink>
      </HStack>
    </LinkBox>
  );
}
