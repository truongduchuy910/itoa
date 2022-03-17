import { gql } from "@apollo/client";

export const PRODUCT_CART_CREATE = gql`
  mutation {
    createProductCart(data: { items: { disconnectAll: false } }) {
      id
    }
  }
`;
export default function ProductCartCreate() {
  return "";
}
