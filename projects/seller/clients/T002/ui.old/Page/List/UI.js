import { Box, Flex, HStack, Skeleton, VStack } from "@chakra-ui/react";
import { Fragment } from "react";
import LogoUI from "@itoa/ui/Logo/UI";
/**
 *
 * @param {import("@apollo/client").QueryResult} param
 */
export default function PageListUI({
  allPages,
  _allPagesMeta,
  clickMore,
  minH,
}) {
  return <Box minH={minH} bg="yellow.100" />;
}
