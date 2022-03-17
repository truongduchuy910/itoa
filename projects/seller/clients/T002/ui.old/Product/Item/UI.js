import {
  Box,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Square,
  Stack,
} from "@chakra-ui/react";
import { Fragment } from "react";

export default function ProductItemUI({ product }) {
  return (
    <Fragment>
      <SimpleGrid columns={2} py={2}>
        <Box pr={2}>
          <Skeleton w="full" pb="100%" />
        </Box>
        <Square>
          <Stack w={"full"}>
            <Skeleton height={5} />
            <SkeletonText spacing={2} noOfLines={3} />
            <Skeleton height={10} w={200} />
            <SkeletonText spacing={2} noOfLines={5} />
          </Stack>
        </Square>
      </SimpleGrid>
      <SkeletonText spacing={2} noOfLines={5} />
    </Fragment>
  );
}
