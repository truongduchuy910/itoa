/**
 * CLIENT ONLY
 */
import {
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { PRODUCT_CART } from "@itoa/components/Product/Cart/Item";

export const INFORMATION_QUERY = gql`
  query ($first: Int, $category: ProductCategoryWhereInput) {
    allProductCategories(first: $first, where: $category) {
      name
      url
      id
      prioritize
      file {
        publicUrl
      }
      childs {
        id
        name
        url
        childs {
          id
          name
          url
        }
      }
    }
    allServices {
      id
      name
      post {
        url
      }
    }
    allPostHashtags {
      id
      name
      url
    }
    allFeatures {
      id
      name
      post {
        url
      }
    }
    allPages {
      id
      logo {
        publicUrl
      }
      store
      slogan
      address
      intro
      phone
      email
      contact
      twitter
      pinterest
      youtube
      embed
      pageId
      gtag
      transfer
      ship
      shipMoneySupport
    }
  }
`;
export const INFORMATION_VARS = {
  first: 7,
  category: { parent_is_null: true },
};

export const CREATE_PRODUCT_ORDER = gql`
  mutation ($data: ProductOrderCreateInput) {
    createProductOrder(data: $data) {
      id
      contact {
        phone
        name
        address
      }
      total
      saving
      discount {
        id
        code
      }
      items {
        id
        quantity
        product {
          name
          image {
            publicUrl
          }
        }
        sale
        price
        stock {
          id
          attributeValues {
            id
            value
          }
        }
      }
    }
  }
`;
export default function ProductOrderCreate({ UI }) {
  const router = useRouter();
  const [contact, setContact] = useState({});
  const [payment, setPayment] = useState("cod");
  const [code, setCode] = useState("");
  const [queryCart, { loading, error, data = {}, called }] = useLazyQuery(
    PRODUCT_CART,
    {
      onCompleted: (data) => {},
    },
  );
  const [onCreate, { loading: _loading }] = useMutation(CREATE_PRODUCT_ORDER, {
    onCompleted: ({ createProductOrder = {} }) => {
      if (createProductOrder.id)
        router.push(`/don-hang/${createProductOrder.id}`);
    },
  });
  const id = localStorage.getItem("cart");
  useEffect(() => {
    if (id && !called) queryCart({ variables: { id } });
  }, [id]);
  const {
    loading: __loading,
    error: __error,
    data: __data = {},
  } = useQuery(INFORMATION_QUERY, {
    variables: INFORMATION_VARS,
  });
  const { ProductCart = {} } = data;
  const { allPages = [] } = data;
  const [page = {}] = allPages;
  const onProductOrderCreate = async () => {
    if (!_loading) {
      return await onCreate({
        variables: {
          data: {
            contact: { create: contact },
            payment,
            cart: { connect: { id: ProductCart.id } },
            code,
          },
        },
      });
    }
  };

  return useMemo(
    () => (
      <UI
        ProductCart={ProductCart}
        page={page}
        setContact={setContact}
        payment={payment}
        setPayment={setPayment}
        setCode={setCode}
        onProductOrderCreate={onProductOrderCreate}
      />
    ),
    [UI.name, ProductCart, page],
  );
}
