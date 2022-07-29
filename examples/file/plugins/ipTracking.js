const composeHook = require("./utils/composeHook");
const { Text } = require("@itoa/fields");
const ipTracking = (
  servers = [
    "103.176.178.169",
    "103.176.178.171",
    "103.176.178.181",
    "103.176.178.190",
  ]
) => {
  return ({ fields, hooks = {}, ...config }) => {
    const newResolveInput = ({ context, resolvedData }) => {
      const { req } = context;
      var ips =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

      if (ips) {
        const [ip] = ips.split(", ").filter((ip) => {
          return !servers.includes(ip);
        });
        if (ip) resolvedData.ip = ip;
      }
      return resolvedData;
    };
    const originalResolveInput = hooks.resolveInput;
    hooks.resolveInput = composeHook(originalResolveInput, newResolveInput);
    return {
      ...config,
      hooks,
      fields: {
        ...fields,
        ip: {
          type: Text,
          adminConfig: {
            isReadOnly: true,
          },
        },
      },
    };
  };
};
module.exports = ipTracking;
