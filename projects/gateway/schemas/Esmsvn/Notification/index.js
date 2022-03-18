let { Text, Relationship, Checkbox, Integer, Select } = require("@itoa/fields");
// const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");
const axios = require("axios");
const { gql } = require("@apollo/client");
const types = {
  brandname: 2,
  static: 8,
};
module.exports = {
  active: true,
  fields: {
    from: { type: Relationship, ref: "Esmsvn", isRequired: true },
    to: { type: Text, isRequired: true },
    text: { type: Text, isRequired: true },
    type: {
      type: Select,
      options: [
        { value: "brandname", label: "Thương hiệu riêng" },
        { value: "static", label: "Cố định" },
      ],
    },
    esmsId: { type: Text },
  },
  hooks: {
    resolveInput: async ({
      operation,
      existingItem,
      originalInput,
      resolvedData,
      context,
      listKey,
      fieldPath,
      addValidationError,
    }) => {
      const { from, to, type, text } = resolvedData;

      const {
        data: { esms },
      } = await context.executeGraphQL({
        query: gql`
          query($from: EsmsvnWhereUniqueInput!) {
            esms: Esmsvn(where: $from) {
              brandname
              apiKey
              secretKey
            }
          }
        `,
        variables: {
          from: { id: from },
        },
      });
      if (!esms) throw new Error("Không tìm thấy esms");

      const { brandname, apiKey, secretKey } = esms;
      try {
        const { data = {} } = await axios.post(
          "http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json",
          {
            Phone: to,
            Content: text,
            ApiKey: apiKey,
            SecretKey: secretKey,
            SmsType: types[type],
            Brandname: type === "brandname" ? brandname : null,
            Sandbox: process.env.NODE_ENV === "production" ? 0 : 1,
          }
        );
        resolvedData.esmsId = data.SMSID;
      } catch ({ data: { CodeResult, CountRegenerate, ErrorMessage } }) {
        throw new Error(ErrorMessage);
      }
      return resolvedData;
    },
  },
  labelField: "subject",
  plugins: [atTracking()],
};
