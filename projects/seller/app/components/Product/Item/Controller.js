import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { cartId } from "../Cart/Controller";
export const QUERY_PRODUCT = gql`
  query ProductItem(
    $productWhereInput: ProductWhereInput
    $stock: ProductStockWhereInput
  ) {
    allProducts(first: 1, where: $productWhereInput) {
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
        id
        name
        url
      }
      categories {
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
      }
      _stocksMeta(where: $stock) {
        count
      }
    }
  }
`;
const ProductItem = ({
  UI,
  productWhereInput = { url: "" },
  first,
  skip,
  quickview,
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
  const {
    loading,
    error,
    data = {},
    variables,
    refetch,
  } = useQuery(QUERY_PRODUCT, {
    variables: {
      productWhereInput,
      first,
      skip,
      stock: {},
    },
  });
  const { allProducts = [] } = data;
  var [product = {}] = allProducts;
  /**
   *
   */
  const onChangeAttributeValues = (values = []) => {
    var update = {
      ...variables,
      stock: {
        attributeValues_every: { id_in: values.map((value) => value.id) },
      },
    };
    refetch(update);
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
      return new Promise((_, reject) => {
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
    return new Promise((_, reject) => {
      reject({
        graphQLErrors: [{ message: "Không thành công" }],
      });
    });
  };
  var total = 0;
  product?.stocks?.map((stock) => {
    total += Number(stock.quantity);
  });
  const images = [{ file: product?.image }, ...(product?.images || [])];
  return (
    <UI
      loading={loading}
      error={error}
      product={product}
      images={images}
      isOutOfStock={!total}
      total={total}
      quantity={quantity}
      quickview={quickview}
      clickPlus={clickPlus}
      clickMinus={clickMinus}
      addToCart={addToCart}
      onChangeAttributeValues={onChangeAttributeValues}
    />
  );
};
export default ProductItem;
