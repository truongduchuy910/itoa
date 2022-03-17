import { gql, makeVar, useQuery } from "@apollo/client";
import { allProductFormat } from "@itoa/components/List";

export const query = gql`
  query (
    $first: Int
    $skip: Int
    $category: ProductCategoryWhereInput
    $product: ProductWhereInput
  ) {
    _allProductCategoriesMeta(where: $category) {
      count
    }
    allProductCategories(where: $category) {
      id
      name
      description
      file {
        publicUrl
      }
      prioritize
      url
      _productsMeta {
        count
      }
      products(first: $first, skip: $skip, where: $product) {
        id
        image {
          publicUrl
        }
        name
        price
        sale
        isOutOfStock
        quantity
        status
        description
        detail {
          publicUrl
        }
        guide
        isDraft
        url
        categories {
          url
        }
      }
    }
  }
`;

export default function ProductList({
  UI,
  children,
  first = 8,
  skip,
  category,
  product,
}) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, category, product },
  });
  if (loading) return "...";
  if (error) return error.message;
  var { allProductCategories = [], _allProductCategoriesMeta } = data;
  var [productCategory] = allProductCategories;
  const count = productCategory.products.length;
  console.log(count);
  function clickMore(e) {
    if (loading || error) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult = {}, { fetchMoreResult }) => {
        var [productCategory = { products: {} }] =
          previousResult.allProductCategories;
        var [productCategoryMore] = fetchMoreResult.allProductCategories;
        productCategory = {
          ...productCategory,
          products: [
            ...productCategory.products,
            ...productCategoryMore.products,
          ],
        };
        return {
          ...previousResult,
          allProductCategories: [productCategory],
        };
      },
    });
  }
  productCategory = {
    ...productCategory,
    products: allProductFormat(productCategory.products),
  };

  return UI ? (
    <UI
      allProductCategories={allProductCategories}
      _allProductCategoriesMeta={_allProductCategoriesMeta}
      productCategory={productCategory}
      clickMore={clickMore}
    />
  ) : (
    children({
      allProductCategories,
      _allProductCategoriesMeta,
      clickMore,
      productCategory,
    })
  );
}
