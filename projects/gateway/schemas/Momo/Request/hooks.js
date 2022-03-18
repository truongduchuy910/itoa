const { default: axios } = require("axios");
const crypto = require("crypto");
async function transaction({
  returnUrl,
  amount,
  extraData = "",
  orderInfo = "",
  partner,
  access,
  secret,
  endpoint,
  orderId,
  requestId,
  notifyUrl,
}) {
  var rawSignature = `partnerCode=${partner}&accessKey=${access}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyUrl}&extraData=${extraData}`;
  var signature = crypto
    .createHmac("sha256", secret)
    .update(rawSignature)
    .digest("hex");
  const body = {
    partnerCode: partner,
    accessKey: access,
    requestId,
    amount,
    orderId,
    orderInfo,
    returnUrl,
    notifyUrl,
    extraData,
    requestType: "captureMoMoWallet",
    signature,
  };
  const { data } = await axios.post(endpoint, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
module.exports = { transaction };
