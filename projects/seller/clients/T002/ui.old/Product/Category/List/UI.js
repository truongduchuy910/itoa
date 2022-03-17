import { Box, SimpleGrid, Skeleton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
export default function ProductCategoryListUI({
  allProductCategories,
  _allProductCategoriesMeta,
  clickMore,
  columns = { base: 2, md: 2 },
}) {
  return (
    <SimpleGrid columns={columns} gap={2} pb={2}>
      {allProductCategories.map((category) => {
        return (
          <NextLink href={`/san-pham/${category.url}`} passHref>
            <Link>
              <Skeleton pb={"100%"} />
            </Link>
          </NextLink>
        );
      })}
    </SimpleGrid>
  );
}
