import { gql, useQuery } from "@apollo/client";

const ProductOrderList = ({ UI, ProductOrderWhereInput }) => {
  console.log(ProductOrderWhereInput);
  const { loading, error, data } = useQuery(
    gql`
      query ($condition: ProductOrderWhereInput) {
        allProductOrders(where: $condition, sortBy: createdAt_DESC) {
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
    { variables: { condition: ProductOrderWhereInput } },
  );
  return <UI {...data} />;
};
export default ProductOrderList;
