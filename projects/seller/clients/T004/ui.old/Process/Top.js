import { Progress } from "@chakra-ui/react";

export default function ProcessTop({ loading }) {
  return (
    loading && (
      <Progress
        size="xs"
        isIndeterminate
        pos="absolute"
        zIndex="toast"
        w="full"
        bg="brand.200"
        colorScheme="brand"
      />
    )
  );
}
