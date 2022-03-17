import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Loading from "../../../elements/Loading";
// import { cartId, refetchProductCart } from "../Cart";
// import { refetchProductCartItemList } from "../Cart/Item/List";
export const QUERY_PRODUCT = gql`
  query ($product: ProductWhereInput, $stock: ProductStockWhereInput) {
    allProducts(first: 1, where: $product) {
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
      isOutOfStock
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
const ProductItem = ({ UI, ProductWhereInput = { url: "" }, quickview }) => {
  // const [quantity, setQuantity] = useState(1);
  // const [onCreate, createResult] = useMutation(
  //   gql`
  //     mutation ($data: ProductCartItemCreateInput) {
  //       createProductCartItem(data: $data) {
  //         id
  //         sale
  //         price
  //         quantity
  //         product {
  //           id
  //           name
  //           image {
  //             publicUrl
  //           }
  //         }
  //         stock {
  //           id
  //           attributeValues {
  //             id
  //             value
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   {
  //     onCompleted: (data) => {
  //       refetchProductCartItemList()();
  //       refetchProductCart()();
  //     },
  //   },
  // );
  const {
    loading,
    error,
    data = {},
    previousData,
    variables,
    refetch,
  } = useQuery(QUERY_PRODUCT, {
    variables: { product: ProductWhereInput, stock: {} },
    onCompleted: (data) => {
      console.log(data);
    },
  });
  if (loading || error) return <Loading variant={{ height: "50vh" }} />;
  const {
    allProducts: [product = {}],
  } = data;
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
  // const clickPlus = (e) => {
  //   setQuantity((quantity) => quantity + 1);
  // };
  // const clickMinus = (e) => {
  //   setQuantity((quantity) => (quantity > 1 ? quantity - 1 : quantity));
  // };
  // const addToCart = (e) => {
  //   if (product._stocksMeta.count > 1) {
  //     return new Promise((resolve, reject) => {
  //       reject({
  //         graphQLErrors: [{ message: "Vui lòng chọn một thuộc tính" }],
  //       });
  //     });
  //   }

  //   if (!loading && product._stocksMeta.count <= 1 && cartId()) {
  //     const variables = {
  //       data: {
  //         stock: product._stocksMeta.count
  //           ? { connect: { id: product.stocks[0].id } }
  //           : null,
  //         product: { connect: { id: product.id } },
  //         cart: { connect: { id: cartId() } },
  //         quantity,
  //       },
  //     };
  //     return onCreate({ variables });
  //   }
  //   return new Promise((resolve, reject) => {
  //     reject({
  //       graphQLErrors: [{ message: "Không thành công" }],
  //     });
  //   });
  // };
  const { stocks = [], _stocksMeta = {} } = product;
  var quantity = 0;
  stocks.map((stock) => (quantity += stock.quantity));
  // if user choosed, only one stock valid
  const [stock] = _stocksMeta.count > 1 ? [] : stocks;
  return (
    <UI
      product={product}
      quantity={quantity}
      stock={stock}
      quickview={quickview}
      // clickPlus={clickPlus}
      // clickMinus={clickMinus}
      // addToCart={addToCart}
      onChangeAttributeValues={onChangeAttributeValues}
    />
  );
};
export default ProductItem;
