const { request, gql } = require("graphql-request");

let { Relationship, Select, Text, Integer, Checkbox } = require("@itoa/fields");
const { roleAny } = require("../../access");
const { of } = require("../../fields");
const { atTracking, idTracking } = require("@itoa/list-plugins");
const CREATE_NOTIFICATION = `
  mutation($tag: String, $text: String) {
    createNotification(
      data: { tag: $tag, text: $text }
    ) {
      id
    }
  }
`;
const DELETE_CARTITEMS = gql`
  mutation($cart: ID!) {
    updateProductCart(id: $cart, data: { items: { disconnectAll: true } }) {
      id
    }
  }
`;
const DELETE_CART_ID = gql`
  mutation($cartItem: ID!) {
    updateProductCartItem(
      id: $cartItem
      data: { cart: { disconnectAll: true } }
    ) {
      id
    }
  }
`
const GET_GROUP = gql`
  query($group: String) {
    allNotificationGroups(where: { tag: $group }) {
      id
      tag
    }
  }
`;
const GET_DETAIL = gql`
  query($contact: ID!, $cart: ID!, $code: String) {
    Contact(where: { id: $contact }) {
      id
      name
      phone
      address
    }
    ProductCart(where: { id: $cart }) {
      items {
        id
        quantity
        sale
        price
        product {
          id
          name
          sale
          price
        }
        stock {
          attributeValues {
            id
            value
          }
        }
      }
    }
    allPages {
      shipMoneySupport
    }
    allProductDiscounts(where: { code: $code }) {
      id
      name
      value
      type
      condition
    }
  }
`;
module.exports = {
  active: true,
  fields: {
    contact: {
      type: Relationship,
      ref: "Contact",
    },
    code: { type: Text },
    cart: { type: Relationship, ref: "ProductCart" },
    /**
     *
     */
    status: { type: Relationship, ref: "ProductOrderStatus", many: true },
    isExport: {
      type: Checkbox,
      adminConfig: {
        isReadOnly: true,
      },
    },
    //
    items: {
      type: Relationship,
      ref: "ProductCartItem",
      many: true,
      adminConfig: {
        isReadOnly: true,
      },
    },
    payment: {
      type: Select,
      options: [
        { value: "cod", label: "COD" },
        { value: "transfer", label: "Chuyển khoản" },
        { value: "credit", label: "tín dụng" },
      ],
      adminConfig: {
        isReadOnly: true,
      },
    },
    discount: {
      type: Relationship,
      ref: "ProductDiscount.orders",
      adminConfig: {
        isReadOnly: true,
      },
    },
    saving: { type: Integer },
    total: { type: Integer },
    of,
  },

  hooks: {
    // https://www.itoajs.com/api/hooks#resolveinput
    resolveInput: async ({ operation, listKey, originalInput, resolvedData }) => {
      return resolvedData;
    },
    // https://www.itoajs.com/api/hooks/#validateinput
    validateInput: async (params) => {
      const { operation, listKey, resolvedData, context, originalInput } = params;
      console.log(operation, listKey)
      if (operation === "create") {
        const {
          contact: {
            create: { phone, name, address, note },
          },
          cart: {
            connect: { id },
          },
        } = originalInput;
        if (!name) throw new Error("Vui lòng nhập Họ tên.");
        if (!phone) throw new Error("Vui lòng nhập số điện thoại.");
        if (!address) throw new Error("Vui lòng nhập địa chỉ.");
        if (!note) throw new Error("Vui lòng nhập ghi chú.");
        if (!id) throw new Error("Lỗi, thử tải lại trang.");
      }
      if (operation === "create") {
        /**
         * GET DETAIL
         */
        const {
          data: {
            allPages: [page],
            ProductCart: { items: allProductCartItems = [] },
            Contact: contact = {},
            allProductDiscounts = [],
          },
          errors,
        } = await context.executeGraphQL({
          context,
          query: GET_DETAIL,
          variables: {
            contact: resolvedData.contact,
            cart: resolvedData.cart,
            code: resolvedData.code,
          },
        });
        /**
         * ERROR HANDLE
         */

        if (!allProductCartItems.length)
          throw new Error("Bạn chưa chọn sản phẩm.");
        if (resolvedData.code && !allProductDiscounts.length)
          throw new Error("Mã khuyến mãi không tồn tại.");
        if (!page || !contact.id) throw new Error("Lỗi, thử tải lại trang.");
        if (errors) throw new Error(errors);

        /**
         *
         */
        resolvedData.items = allProductCartItems.map((item) => item.id);
        //
        var saving = 0;
        const [Discount] = allProductDiscounts;
        var provisional = 0;
        allProductCartItems.map((item) => {
          provisional += (item.product.sale || item.product.price) * (item.quantity || 1);
          saving +=
            (item.product.price - (item.product.sale || item.product.price)) * (item.quantity || 1);
          context.executeGraphQL({
            context,
            query: DELETE_CART_ID,
            variables: {
              cartItem: item.id,
            },
          })
        });
        if (Discount && provisional < Discount.condition)
          throw new Error(
            `Lỗi, mã chỉ áp dụng cho đơn hàng trên ${Discount.condition}đ`
          );
        /**
         *
         */
        resolvedData.discount = Discount ? Discount.id : null;

        var discount = Discount
          ? Discount.type === "percentage"
            ? Math.round(((provisional / 100) * Discount.value) / 1000) * 1000
            : Discount.value
          : 0;
        resolvedData.total =
          (discount ? provisional - discount : provisional) +
          (page.shipMoneySupport || 0);
        saving += discount;
        resolvedData.saving = saving;
        /**
         * CREATE MESSAGE
         */
        const text = `KHÁCH HÀNG
${contact.name},
Điện thoại ${contact.phone}.
Địa chỉ ${contact.address}.
Thanh toán ${resolvedData.payment}
CHI TIẾT
${allProductCartItems
            .map(
              (item) =>
                `${item.quantity} ${item.product.name} ${formatMoney(
                  item.product.sale || item.product.price
                )} ${item.stock
                  ? item.stock.attributeValues.map((value) => value.value).join(",")
                  : ``
                }`
            )
            .join("\n")}

  ${discount
            ? `TẠM TÍNH ${formatMoney(provisional)}
🔖 -${discount}đ
THÀNH TIỀN ${formatMoney(provisional - discount)}đ`
            : `THÀNH TIỀN ${formatMoney(provisional)}đ`
          }
`;
        const {
          data: disconnectItems,
          errors: deleteErrors,
        } = await context.executeGraphQL({
          context,
          query: DELETE_CARTITEMS,
          variables: {
            cart: resolvedData.cart,
          },
        });
        /**
         * BROADCAST
         */
        const domain = context.req.headers.referer.split("/")[2];
        try {
          if (process.env.NODE_ENV === 'production') await request("https://api.itoa.vn/admin/api", CREATE_NOTIFICATION, {
            tag: domain,
            text,
          });
        } catch (e) {
          console.log(e);
        }
        await of.hooks.validateInput(params);
      }
      return resolvedData;
    },

    validateDelete: async ({ existingItem, context }) => {
      const { id } = existingItem;
      const {
        data: { ProductOrder },
      } = await context.executeGraphQL({
        context,
        query: `query($id: ID!) {
        ProductOrder(where: { id: $id }) {
          items {
            id
          }
        }
      }`,
        variables: { id },
      });
      const {
        data: { deleteProductOrders },
        errors,
      } = await context.executeGraphQL({
        context,
        query: `mutation($ids: [ID!]) {
          deleteProductCartItems(ids: $ids) {
            id
          }
        }
        `,
        variables: { ids: ProductOrder.items.map((item) => item.id) },
      });
    },
  },

  access: roleAny,
  plugins: [atTracking(), idTracking()],
};
function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
        : "")
    );
  } catch (e) { }
}
