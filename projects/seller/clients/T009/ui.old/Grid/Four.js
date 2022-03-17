import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { Fragment } from "react";

export default function GridFour({ children, heading, justify = "center" }) {
  return (
    <Box bg="orange.50" minH={"50vh"} mb={2}>
      {children}
    </Box>
  );
}
