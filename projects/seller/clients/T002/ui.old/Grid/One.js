import { Grid, GridItem } from "@chakra-ui/react";

export default function GridOne() {
  return (
    <Grid
      minH={"60vh"}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(12, 1fr)"
      gap={2}
      pb={2}
    >
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={12} bg="green.100" />
      <GridItem colSpan={{ base: 12, lg: 9 }} rowSpan={4} bg="green.100" />
      <GridItem colSpan={{ base: 12, lg: 9 }} rowSpan={2} bg="green.100" />
      <GridItem colSpan={{ base: 12, lg: 9 }} rowSpan={6} bg="green.100" />
    </Grid>
  );
}
