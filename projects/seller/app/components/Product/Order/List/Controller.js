import { gql, useQuery } from "@apollo/client";

const ProductOrderList = ({
  UI,
  productOrderWhereInput,
  skip,
  first,
  seller,
}) => {
  const {
    loading,
    error,
    data = {},
  } = useQuery(
    gql`
      query ProductOrderList(
        $first: Int
        $skip: Int
        $productOrderWhereInput: ProductOrderWhereInput
      ) {
        allProductOrders(
          first: $first
          skip: $skip
          where: $productOrderWhereInput
          sortBy: createdAt_DESC
        ) {
          id
          contact {
            phone
            name
            address
            email
            message
          }
          code
          status {
            id
            value
          }
          items {
            id
            sale
            price
            quantity
            product {
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
          payment
          discount {
            code
            value
            name
            type
          }
          total
          saving
          createdAt
          updatedAt
        }
      }
    `,
    {
      variables: { productOrderWhereInput, first, skip },
    }
  );
  const { allProductOrders = [] } = data;
  return (
    <UI
      loading={loading}
      error={error}
      allProductOrders={allProductOrders}
      seller={seller}
    />
  );
};
export default ProductOrderList;
