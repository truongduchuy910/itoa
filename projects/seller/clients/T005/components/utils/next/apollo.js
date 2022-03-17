import { useMemo } from "react";
import { ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client/link/http";

import { page } from "../config/index";
import { InMemoryCache, makeVar, gql } from "@apollo/client";
import { init } from "./action";
export const orderCountVar = makeVar(0);
export const newOrderVar = makeVar(false);
export const newOrderCountVar = makeVar();
export const customerVar = makeVar({ id: null });
export const refetchCustomer = makeVar(async () => {});

/** LOCALSTORE APOLLO */

export const USER = gql`
  query {
    user @client
  }
`;
export const CART = gql`
  query {
    cartItems @client
  }
`;
export const WISHLIST = gql`
  query {
    wishlist @client
  }
`;
export const COMPARE = gql`
  query {
    compare @client
  }
`;
export const CUSTOMER = gql`
  query {
    customer @client
  }
`;
// initialize
export const init = () => {
  cache.writeQuery({
    query: USER,

    data: {
      user:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("user"))
          : { id: null, email: null, isAdmin: null, isSeller: null },
    },
  });

  cache.writeQuery({
    query: CART,
    data: {
      cartItems:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cartItems") || '{ "data": [] }')
              .data
          : null,
    },
  });
  cache.writeQuery({
    query: COMPARE,
    data: {
      compare:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("compare") || '{ "data": [] }').data
          : null,
    },
  });
  cache.writeQuery({
    query: WISHLIST,
    data: {
      wishlist:
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("wishlist") || '{ "data": [] }')
              .data
          : null,
    },
  });
  cache.writeQuery({
    query: CUSTOMER,

    data: {
      customer: { phone: null, name: null, address: null },
    },
  });
};
const modifyUser = ({ user }) => {
  if (typeof window !== "undefined") {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    cache.modify({
      fields: {
        user() {
          return user;
        },
      },
    });
  }
};
const modifyCart = ({ items }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify({ data: items }));
    cache.modify({
      fields: {
        cartItems() {
          return items;
        },
      },
    });
  }
};
const modifyWishlist = ({ items }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify({ data: items }));
    cache.modify({
      fields: {
        wishlist() {
          return items;
        },
      },
    });
  }
};
const modifyCompare = ({ items }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("compare", JSON.stringify({ data: items }));
    cache.modify({
      fields: {
        compare() {
          return items;
        },
      },
    });
  }
};

const modifyCustomer = ({ customer }) => {
  if (typeof window !== "undefined") {
    if (customer) {
      localStorage.setItem("customer", JSON.stringify(customer));
    } else {
      localStorage.removeItem("customer");
    }
    cache.modify({
      fields: {
        customer() {
          return customer;
        },
      },
    });
  }
};

/* 
    you can use client variable below
*/
export const emptyCompare = () => {
  modifyCompare({ items: [] });
};
export const removeCompareItem = function (removeItem) {
  let products = [];
  try {
    // get
    products = JSON.parse(localStorage.getItem("compare") || '{ "data": [] }')
      .data;
  } catch {}

  // change
  let items = [];
  products.map((product) => {
    if (product.id !== removeItem.id) items.push(product);
  });
  modifyCompare({ items });
};
export function addProductToLocalCompare(newProduct) {
  // get

  let products = [];
  try {
    products = JSON.parse(localStorage.getItem("compare") || '{ "data": [] }')
      .data;
  } catch {}

  // change
  let others = [];
  products.map((product) => {
    if (product.id !== newProduct.id) {
      others.push(product);
    }
  });
  const items = [...others, newProduct];

  // save
  modifyCompare({ items });
}

export const onSignIn = ({ user }) => {
  modifyUser({ user });
};
export const onSignOut = () => {
  modifyUser({ user: null });
};

export const chooseCustomer = ({ customer }) => {
  modifyCustomer({ customer });
};

export const emptyCart = function () {
  modifyCart({ items: [] });
};
export const removeCartItem = (removeItem) => {
  // get
  const cartItems = JSON.parse(
    localStorage.getItem("cartItems") || '{ "data": [] }'
  ).data;
  // change
  let items = [];
  cartItems.map((item) => {
    if (item.product.id !== removeItem.product.id) items.push(item);
  });
  modifyCart({ items });
};
export const changeCartItem = function (cartItem, change) {
  // get
  let cartItems = [];
  try {
    cartItems = JSON.parse(
      localStorage.getItem("cartItems") || '{ "data": [] }'
    ).data;
  } catch {}

  // change
  let items = [];
  const price = cartItem.product.price - cartItem.product.sale;

  cartItems.map((item, index) => {
    const quantity =
      item.quantity + change > 0 ? item.quantity + change : item.quantity;
    if (item.product.id !== cartItem.product.id) {
      items.push(item);
    } else {
      items.push({
        product: item.product,
        quantity,
        price: price * quantity,
      });
    }
  });
  // save
  modifyCart({ items });
};

export function addProductToLocalCart({ product, variables }) {
  // get

  let cartItems = [];
  try {
    cartItems = JSON.parse(
      localStorage.getItem("cartItems") || '{ "data": [] }'
    ).data;
  } catch {}

  // change
  let items = [];
  let exist = false;
  const price = product.price - product.sale;

  cartItems.map((cartItem) => {
    if (cartItem.product.id !== product.id) {
      items.push(cartItem);
    } else {
      exist = true;
      items.push({
        product: cartItem.product,
        quantity: cartItem.quantity + 1,
        price: price * (cartItem.quantity + 1),
      });
    }
  });
  if (exist === false) items.push({ product, quantity: 1, price });
  // save
  modifyCart({ items });
}
export const emptyWishlist = function () {
  modifyWishlist({ items: [] });
};
export const removeWishListItem = function (removeItem) {
  let products = [];
  try {
    // get
    products = JSON.parse(localStorage.getItem("wishlist") || '{ "data": [] }')
      .data;
  } catch {}

  // change
  let items = [];
  products.map((product) => {
    if (product.id !== removeItem.id) items.push(product);
  });
  modifyWishlist({ items });
};

export function addProductToLocalWishlist(newProduct) {
  // get

  let products = [];
  try {
    products = JSON.parse(localStorage.getItem("wishlist") || '{ "data": [] }')
      .data;
  } catch {}

  // change
  let others = [];
  products.map((product) => {
    if (product.id !== newProduct.id) {
      others.push(product);
    }
  });
  const items = [...others, newProduct];

  // save
  modifyWishlist({ items });
}

export let cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: page.server + "/admin/api",
  credentials: "same-origin",
});
const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache,
  });
}

let apolloClient;
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
export function useApollo(initialState) {
  const store = useMemo(() => {
    init();

    return initializeApollo(initialState);
  }, [initialState]);
  return store;
}
