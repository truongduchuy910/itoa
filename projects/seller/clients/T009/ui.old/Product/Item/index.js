import { gql, useMutation, useQuery } from "@apollo/client";
import { ProductJsonLd } from "next-seo";
import { Fragment, useMemo, useState } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import trans from "@itoa/ui/utils/trans";
import Head from "next/head";

main;
export const QUERY_PRODUCT = gql`
  query (
    $locale: String
    $product: ProductWhereInput
    $stock: ProductStockWhereInput
  ) {
    allProducts(first: 1, where: $product) {
      # translate
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
      id
      image {
        id
        publicUrl
      }
      images {
        id
        alt
        file {
          id
          publicUrl
        }
      }
      _imagesMeta {
        count
      }
      name
      price
      sale
      status
      brand {
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        id
        name
        url
      }
      categories {
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        id
        name
        file {
          publicUrl
        }
        url
      }
      _categoriesMeta {
        count
      }
      description
      detail {
        id
        publicUrl
      }
      guide
      url
      attributes {
        id
        name
        label
        values {
          id
          value
          file {
            publicUrl
          }
        }
      }
      _attributesMeta {
        count
      }
      stocks(where: $stock) {
        id
        quantity
        price
      }
      _stocksMeta(where: $stock) {
        count
      }
    }
  }
`;
const ProductItem = ({
  UI,
  ProductWhereInput = { url: "" },
  quickview,
  ...props
}) => {
  const [quantity, setQuantity] = useState(1);
  const [onCreate, createResult] = useMutation(gql`
    mutation ($data: ProductCartItemCreateInput) {
      createProductCartItem(data: $data) {
        id
        sale
        price
        quantity
        product {
          id
          name
          image {
            publicUrl
          }
        }
        stock {
          id
          attributeValues {
            id
            value
          }
        }
      }
    }
  `);
  const router = useRouter();
  const { locale } = router;
  var {
    loading,
    error,
    data = {},
    variables,
    refetch,
  } = useQuery(QUERY_PRODUCT, {
    variables: { product: ProductWhereInput, stock: {}, locale },
  });
  data = useMemo(() => trans(data), [variables, locale, loading]);

  const { allProducts = [] } = data;
  var [product = {}] = allProducts;
  /**
   *
   */
  const onChangeAttributeValues = (values = []) => {
    refetch({
      ...variables,
      stock: {
        attributeValues_every: { id_in: values.map((value) => value.id) },
      },
    });
  };
  /**
   *
   */
  const clickPlus = (e) => {
    setQuantity((quantity) => quantity + 1);
  };
  const clickMinus = (e) => {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
  };
  const addToCart = (e) => {
    if (product._stocksMeta.count > 1) {
      return new Promise((resolve, reject) => {
        reject({
          graphQLErrors: [{ message: "Vui lòng chọn một thuộc tính" }],
        });
      });
    }

    if (!loading && product._stocksMeta.count <= 1 && cartId()) {
      const variables = {
        data: {
          stock: product._stocksMeta.count
            ? { connect: { id: product.stocks[0].id } }
            : null,
          product: { connect: { id: product.id } },
          cart: { connect: { id: cartId() } },
          quantity,
        },
      };
      return onCreate({ variables });
    }
    return new Promise((resolve, reject) => {
      reject({
        graphQLErrors: [{ message: "Không thành công" }],
      });
    });
  };
  var total = 0;
  product?.stocks?.map((stock) => {
    total += Number(stock.quantity);
  });
  product = { ...product, isOutOfStock: !total };
  const { stocks = [], _stocksMeta = {} } = product;
  const [stock] = _stocksMeta.count > 1 ? [] : stocks;
  return useMemo(
    () =>
      loading || error || !product ? (
        "..."
      ) : (
        <Fragment>
          <Head>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Product",
                  description: product.description,
                  name: product.name,
                  image: product.image.publicUrl,
                  offers: {
                    "@type": "Offer",
                    availability:
                      product.quantity > 0
                        ? "https://schema.org/InStock"
                        : null,
                    price: product.price,
                    priceCurrency: "VND",
                  },
                }),
              }}
            />
          </Head>
          <UI
            product={product}
            quantity={quantity}
            quickview={quickview}
            clickPlus={clickPlus}
            clickMinus={clickMinus}
            addToCart={addToCart}
            onChangeAttributeValues={onChangeAttributeValues}
            total={total}
            stock={stock}
          />
        </Fragment>
      ),
    [UI.name, product, quantity, loading, total, stock]
  );
};
export default ProductItem;
