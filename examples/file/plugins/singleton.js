const composeHook = require("./utils/composeHook");

exports.singleton = () => (
  { hooks = {}, access = {}, adminConfig = {}, ...rest },
  { listKey, itoa }
) => {
  const newResolveInput = async ({ context, resolvedData, operation }) => {
    if (operation === "create") {
      const list = itoa.getListByKey(listKey);
      const query = `{${list.gqlNames.listQueryMetaName} { count }}`;
      const {
        data: { [list.gqlNames.listQueryMetaName]: listQuery } = {},
        errors,
      } = await context.executeGraphQL({
        context,
        query,
      });
      if (errors) {
        throw errors;
      }
      if (listQuery && listQuery.count && listQuery.count > 0) {
        throw new Error(
          `ItemLimit reached, This Singleton list can not add more item`
        );
      }
    }
    return resolvedData;
  };

  const originalResolveInput = hooks.resolveInput;
  hooks.resolveInput = composeHook(originalResolveInput, newResolveInput);
  return {
    hooks,
    adminConfig: { ...adminConfig, singleton: true },
    ...rest,
  };
};
