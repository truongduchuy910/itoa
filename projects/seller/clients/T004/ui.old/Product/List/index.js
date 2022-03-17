import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { trans } from "@itoa/ui/Translate";
export const PRODUCTS_QUERY = gql`
  query (
    $locale: String
    $first: Int
    $skip: Int
    $condition: ProductWhereInput
    $category: ProductCategoryWhereInput
  ) {
    allProductCategories(where: $category) {
      id
      name
      products(first: $first, skip: $skip, where: $condition) {
        # translate
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        id
        name
        price
        sale
        url
        brand {
          name
        }
        image {
          publicUrl
        }
        images {
          file {
            publicUrl
          }
        }
        categories {
          id
          url
        }
      }
      _productsMeta(where: $condition) {
        count
      }
    }
  }
`;
export const PRODUCTS_VARS = { first: 6, skip: 0, condition: {} };
export default function ProductList({
  first = PRODUCTS_VARS.first,
  skip = PRODUCTS_VARS.skip,
  ProductWhereInput = PRODUCTS_VARS.condition,
  ProductCategoryWhereInput = {},
  UI,
  ...props
}) {
  const router = useRouter();
  const { locale } = router;
  var {
    data = {},
    error,
    loading,
    fetchMore,
    variables,
  } = useQuery(PRODUCTS_QUERY, {
    variables: {
      first,
      skip,
      condition: ProductWhereInput,
      category: ProductCategoryWhereInput,
      locale,
    },
    onError: (error) => {
      console.error("product list", error);
    },
  });
  useEffect(() => {
    if (typeof gtag === "object" && data?.allProductCategories)
      gtag("event", "view_item_list", {
        event_label: "ProductList",
        value: data.allProductCategories.length,
      });
  });
  data = useMemo(() => trans(data), [variables, locale, loading]);
  return useMemo(
    () => (
      <Option
        {...props}
        loading={loading}
        error={error}
        data={data}
        UI={UI}
        fetchMore={fetchMore}
        first={first}
      />
    ),
    [UI.name, loading, error, data, fetchMore, first, skip],
  );
}
const Option = ({ UI, data = {}, fetchMore, loading, error, ...props }) => {
  const { allProductCategories = [] } = data;
  var allProducts = [];
  var _allProductsMeta = { count: 0 };
  useEffect(() => {
    _allProductsMeta.count = 0;
  });
  allProductCategories.map((category) => {
    const { products = [], _productsMeta = {} } = category;
    allProducts = allProducts.concat(products);
    _allProductsMeta.count += Number(_productsMeta.count);
  });

  const [pagination, setPagination] = useState(1);
  const onClickMore = (e) => {
    if (!loading) {
      fetchMore({
        variables: { skip: first * pagination },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setPagination((pagination) => pagination + 1);
          var allProductCategories = previousResult.allProductCategories?.map(
            (_category) => {
              var newCategoty = {};
              var _products = {};
              fetchMoreResult.allProductCategories?.map((category) => {
                if (_category.id === category.id) {
                  _products = _category.products?.concat(category.products);
                  newCategoty = category;
                }
              });

              return { ...newCategoty, products: _products };
            },
          );
          return {
            allProductCategories,
          };
        },
      });
    }
  };
  const onChangeAttributeValues = (values = []) => {
    refetch({
      ...variables,
      stock: {
        attributeValues_every: { id_in: values.map((value) => value.id) },
      },
    });
  };
  return (
    <Fragment>
      <Head>
        {allProducts.map((item) => {
          <script
            key={item.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: item.name,
                brand: item.brand.name,
                image: item.image.publicUrl,
                offers: {
                  "@type": "Offer",
                  price: item.price,
                  priceCurrency: "VND",
                },
              }),
            }}
          />;
        })}
      </Head>
      <UI
        allProductCategories={allProductCategories}
        allProducts={allProducts}
        _allProductsMeta={_allProductsMeta}
        onClickMore={onClickMore}
        // addToCart={addToCart}
        onChangeAttributeValues={onChangeAttributeValues}
        unit={unit}
      />
    </Fragment>
  );
};
