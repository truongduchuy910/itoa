import { gql } from "@apollo/client";

export const CREATE_PRODUCT_CART = gql`
  mutation {
    createProductCart(data: { items: { disconnectAll: false } }) {
      id
    }
  }
`;
