const { GraphQLError } = require("graphql");
const composeHook = require("./utils/composeHook");

const regex = (options) => {
  return ({ fields, hooks = {}, ...config }) => {
    const originalValidateInput = hooks.validateInput;
    const newValidateInput = async (params) => {
      const { resolvedData, addValidationError } = params;
      for (const key in resolvedData) {
        const value = resolvedData[key];
        const regex = fields[key].regex;
        const label = fields[key].label || key;
        if (regex && value && !regex.test(value)) {
          throw new GraphQLError(`${label} không hợp lệ`);
        }
      }
      return resolvedData;
    };
    hooks.validateInput = composeHook(originalValidateInput, newValidateInput);
    return {
      ...config,
      fields,
      hooks,
    };
  };
};
module.exports = regex;
