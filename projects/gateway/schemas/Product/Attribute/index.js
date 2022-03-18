let { Text, Relationship } = require("@itoa/fields");
const { gql } = require("@apollo/client");

const { idTracking } = require("@itoa/list-plugins");
const { lang } = require("../../fields");

module.exports = {
  active: true,
  fields: {
    label: {
      type: Text,
      label: "Tên hiển thị, tên nhóm)",
      adminDoc: "Ví dụ: kích thước, màu sắc,...",
      isRequired: true,
    },
    values: {
      type: Relationship,
      ref: "ProductAttributeValue",
      many: true,
      label: "Các giá trị",
      hooks: {
        beforeChange: async ({ existingItem = {}, resolvedData, context }) => {
          const {
            data: { allProductAttributeValues = [] },
            errors = [],
          } = await context.executeGraphQL({
            context,
            query: gql`
              query($where: ProductAttributeValueWhereInput) {
                allProductAttributeValues(where: $where) {
                  id
                  value
                }
              }
            `,
            variables: { where: { id_in: resolvedData.values } },
          });
          errors.map((error) => {
            console.error(error);
          });
          const values = allProductAttributeValues
            .map((attribute) => {
              return attribute.value;
            })
            .sort((a, b) => {
              return a < b ? 1 : -1;
            });
          resolvedData.name = `${existingItem.label} ${values.join("/")}`;
          return resolvedData;
        },
      },
    },
    name: {
      type: Text,
      label: "Tên để quản lí",
      adminConfig: {
        isReadOnly: true,
      },
    },
    products: {
      type: Relationship,
      ref: "Product.attributes",
      many: true,
      adminConfig: {
        isReadOnly: true,
      },
    },
    ...lang,
  },
  plugins: [idTracking()],
  labelField: "name",

};
