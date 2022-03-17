import { Grid, GridItem } from "@chakra-ui/react";

export default function GridFive() {
  return (
    <Grid
      h={"100vh"}
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={{ base: 2, md: 2, lg: 3 }}
      pb={2}
    >
      <GridItem colSpan={{ base: 12, lg: 4 }} rowSpan={1} bg="gray.200" />
      <GridItem colSpan={{ base: 12, lg: 4 }} rowSpan={1} bg="gray.200" />
      <GridItem colSpan={{ base: 12, lg: 4 }} rowSpan={1} bg="gray.200" />
      <GridItem colSpan={{ base: 12, lg: 12 }} rowSpan={2} bg="gray.200" />
      <GridItem colSpan={{ base: 12, lg: 6 }} rowSpan={1} bg="gray.200" />
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={1} bg="gray.200" />
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={1} bg="gray.200" />
    </Grid>
  );
}
