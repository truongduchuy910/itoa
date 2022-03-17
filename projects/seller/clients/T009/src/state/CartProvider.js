import { gql, makeVar, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

export const cart = makeVar();
export const CartProvider = ({ children }) => {
  const [createProductCart, { loading, data, error, called }] = useMutation(gql`
    mutation {
      createProductCart(data: { items: { disconnectAll: false } }) {
        id
      }
    }
  `);
  useEffect(() => {
    const local = localStorage.getItem("cart");
    if (local) {
      cart(local);
    } else if (called === false) {
      createProductCart()
        .then(({ data }) => {
          const {
            createProductCart: { id },
          } = data;
          localStorage.setItem("cart", id);
          cart(id);
        })
        .catch((e) => console.log(e));
    }
  });
  return children;
};
export const cartErrorSolve = (error, router) => {
  var message = error.toString();
  console.log(message);
  if (
    message === "Nested errors occurred" ||
    message === "Error: You do not have access to this resource"
  ) {
    localStorage.removeItem("cart");
    router.reload();
  }
};
