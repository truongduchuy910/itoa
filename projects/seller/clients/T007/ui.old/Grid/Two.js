import { Grid, GridItem } from "@chakra-ui/react";

export default function GridTwo({
  a = "a",
  b = "b",
  c = "c",
  d = "d",
  e = "e",
  f = "f",
}) {
  return (
    <Grid
      templateRows="repeat(4, 1fr)"
      templateColumns="repeat(12, 1fr)"
      pb={2}
    >
      <GridItem colSpan={{ base: 12, lg: 6 }} rowSpan={2} bg="gray.50">
        {a}
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={2} bg="gray.50">
        {b}
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={4}>
        {c}
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={2}>
        {d}
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={2}>
        {e}
      </GridItem>
      <GridItem colSpan={{ base: 12, lg: 3 }} rowSpan={2}>
        {f}
      </GridItem>
    </Grid>
  );
}
