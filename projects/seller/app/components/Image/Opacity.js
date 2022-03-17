import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Controller from './Controller'

export default function ImageOpacity({ src, width, height }) {
  return (
    <Box overflow="hidden" w="full">
      <Image
        width={width}
        height={height}
        opacity={1}
        transition=".3s ease-in-out"
        _hover={{ opacity: 0.5 }}
        src={src || "/logo.svg"}
      />
    </Box>
  );
}
