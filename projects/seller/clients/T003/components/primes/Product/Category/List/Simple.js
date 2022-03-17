import { Img } from "@chakra-ui/image";
import { Box, SimpleGrid, Text } from "@chakra-ui/layout";

export default function CategoryListSimple({ allProductCategories }) {
  return (
    <SimpleGrid columns={2}>
      {allProductCategories?.map((category) => {
        return (
          <Box
            key={category.id}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Img src={category.file.publicUrl} />
            <Text>{category.name}</Text>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}
