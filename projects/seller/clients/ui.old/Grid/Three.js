import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { Fragment } from "react";

export default function GridHeading({ children, heading, justify = "center" }) {
  return (
    <Fragment>
      <Flex justify={justify} mb={2}>
        {heading ? (
          <Heading textTransform="capitalize">{heading}</Heading>
        ) : (
          <Skeleton height="45px" width={200} />
        )}
      </Flex>
      <Box bg="blue.50" minH={"50vh"} mb={2}>
        {children}
      </Box>
    </Fragment>
  );
}
