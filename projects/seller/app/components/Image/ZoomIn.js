import { Box, Image } from "@chakra-ui/react";
import Controller from './Controller'

export default function ImageZoomIn({ src }) {
  return (
    <Box overflow="hidden" w="full">
      <Image
        transform="scale(1)"
        transition=".3s ease-in-out"
        _hover={{ transform: "scale(1.3)" }}
        src={src || "/logo.svg"}
      />
    </Box>
  );
}
