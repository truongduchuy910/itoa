const { gql } = require("@apollo/client");
let { Text, Relationship, DateTime } = require("@itoa/fields");
const { ip } = require("../../fields");
const { atTracking } = require("@itoa/list-plugins");
const { v1: uuidv1 } = require("uuid");
const hooks = require("./hooks");

module.exports = {
  active: true,
  fields: {
    returnUrl: { type: Text, isRequired: true }, // tra ve khi quet thanh cong
    extraData: { type: Text, isRequired: true }, // it's payment identity
    amount: { type: Text, isRequired: true },
    orderInfo: { type: Text },
    payUrl: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
      },
    },
    business: { type: Relationship, ref: "MomoBusiness" },
    domain: { type: Text },
    // webhook response
    partnerCode: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    requestId: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    orderId: {
      type: Text,
    }, // ma don hang can thanh toan
    orderType: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    transId: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    message: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    localMessage: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    signature: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    payType: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    errorCode: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    notifyUrl: {
      type: Text,
      adminConfig: {
        isReadOnly: true,
        className: "col-sm-12 col-md-6",
      },
    },
    ip,
  },
  hooks: {
    validateInput: async (params) => {
      const { context, resolvedData, operation } = params;
      await ip.hooks.validateInput(params);
      if (operation !== "create") return;
      const {
        returnUrl,
        extraData,
        amount,
        orderInfo,
        business,
        domain,
      } = resolvedData;
      const { data = {}, errors } = await context.executeGraphQL({
        context,
        query: gql`
          query($id: ID, $domain: String) {
            allMomoBusinesses(
              where: { OR: [{ id: $id }, { domain: $domain }] }
            ) {
              id
              partner
              access
              secret
              endpoint
            }
          }
        `,
        variables: {
          id: business,
          domain: domain,
        },
      });
      const { allMomoBusinesses = [] } = data;
      const [MomoBusiness] = allMomoBusinesses;
      if (!resolvedData.business && MomoBusiness)
        resolvedData.business = MomoBusiness.id;
      const { id, partner, access, secret, endpoint } = MomoBusiness;
      const orderId = resolvedData.orderId || uuidv1();
      var requestId = uuidv1();
      const notifyUrl = process.env.DOMAIN + "/momo/webhook";

      const transaction = await hooks.transaction({
        notifyUrl,
        orderId,
        requestId,
        returnUrl,
        extraData,
        amount,
        orderInfo,
        id,
        partner,
        access,
        secret,
        endpoint,
      });
      resolvedData.requestId = requestId;
      resolvedData.orderId = orderId;
      resolvedData.notifyUrl = notifyUrl;
      if (transaction) resolvedData.payUrl = transaction.payUrl;
    },
  },

  plugins: [atTracking()],
  labelField: "extraData",
};
