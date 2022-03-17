import { Box, SimpleGrid, Skeleton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
export default function ProductListUI({
  allProducts,
  _allProductsMeta,
  clickMore,
  height = 250,
}) {
  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={2} py={2}>
      {allProducts.map((product) => {
        const [category] = product.categories;
        return (
          <NextLink href={`/san-pham/${category.url}/${product.url}`} passHref>
            <Link>
              <Skeleton height={height} />
            </Link>
          </NextLink>
        );
      })}
    </SimpleGrid>
  );
}
