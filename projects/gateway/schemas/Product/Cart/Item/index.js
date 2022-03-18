const { gql } = require("@apollo/client/core");
let { Relationship, Integer, Virtual } = require("@itoa/fields");
const { atTracking, idTracking } = require("@itoa/list-plugins");
const { roleAny } = require("../../../access");
const { of } = require("../../../fields");
const GET = gql`
  query($product: ID!, $stock: ID) {
    product: Product(where: { id: $product }) {
      id
      sale
      price
      attributes {
        id
      }
    }
    allProductStocks(where: { id: $stock }) {
      quantity
    }
    allPages {
      ordering
    }
  }
`;
module.exports = {
  active: true,
  fields: {
    product: {
      type: Relationship,
      ref: "Product",
    },
    sale: {
      type: Integer,
    },
    price: {
      type: Integer,
    },
    percent: {
      type: Virtual,
      graphQLReturnType: `Int`,
      args: [{ name: "step", type: "Int" }],
      resolver: (item, { step = 1 }) => {
        const { sale, price } = item;
        const percent = Math.round(100 - (sale / price) * 100);
        return sale ? Math.ceil(percent / step) * step : 0;
      },
    },
    isInCart: {
      type: Virtual,
      graphQLReturnType: `Boolean`,
      resolver: (item) => Boolean(item.cart),
    },
    quantity: {
      type: Integer,
    },
    cart: {
      type: Relationship,
      ref: "ProductCart.items",
    },
    stock: { type: Relationship, ref: "ProductStock" },
    of,
  },

  hooks: {
    // https://www.itoajs.com/api/hooks/#validateinput
    validateInput: async (params) => {
      var {
        operation,
        listKey,
        resolvedData,
        existingItem,
        context,
        originalInput,
      } = params;
      console.log(operation, listKey, resolvedData);
      const variables = {
        product:
          operation === "create"
            ? originalInput.product.connect.id
            : String(existingItem.product),
        stock:
          operation === "create"
            ? originalInput.stock
              ? originalInput.stock.connect.id
              : null
            : existingItem.stock
              ? String(existingItem.stock)
              : null,
      };
      /**
       * Get product
       */
      const {
        data: {
          product,
          allProductStocks: [stock = false],
          allPages: [page],
        },
        errors,
      } = await context.executeGraphQL({
        context,
        query: GET,
        variables,
      });
      if (errors) throw new Error(errors);
      if (!page.ordering)
        throw new Error(
          "Tính năng đặt hàng tạm đóng, vui lòng liên hệ để mua hàng."
        );
      if (!stock) {
        // Có quản lí kho (page.mode === "stock") nhưng chưa nhập giá trị kho.
        // Thì ở giao diện sẽ không tìm thấy và không gửi lên được id stock
        throw new Error(
          "Bạn chưa chọn đủ thuộc tính hoặc sản phẩm chưa được cập nhật"
        );
      }

      // Nếu có thuộc tính thì bắt buộc phải chọn đủ thuộc tính.

      // Kiểm tra số lượng
      if (stock) {
        if (stock.quantity === 0) throw new Error("Sản phẩm hết hàng.");
        if (stock.quantity < originalInput.quantity)
          throw new Error("Tồn kho không đủ.");
      }

      /**
       *
       */
      if (resolvedData.cart) {
        resolvedData.sale = 0;
        resolvedData.price = 0;
      } else {
        resolvedData.sale = product.sale;
        resolvedData.price = product.price;
      }
      /**
       *
       */
      await of.hooks.validateInput(params);
      return resolvedData;
    },
  },
  access: roleAny,
  plugins: [atTracking(), idTracking()],
};
