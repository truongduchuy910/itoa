import {
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  INFORMATION_QUERY,
  INFORMATION_VARS,
} from "../../../../frames/Infomation";
import { CREATE_PRODUCT_CART } from "../../Cart/Create";
import { cartId, PRODUCT_CART } from "../../Cart/Item";

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
      onCompleted: ({ productCart }) => {
        if (productCart?.items && !productCart?.items?.length) router.push("/");
      },
    },
  );
  const [onCreate, { loading: _loading }] = useMutation(CREATE_PRODUCT_ORDER, {
    onCompleted: ({ createProductOrder = {} }) => {
      if (createProductOrder.id)
        router.push(`/don-hang/${createProductOrder.id}`);
    },
  });
  const id = useReactiveVar(cartId);
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
