const composeHook = (originalHook, newHook) => async (params) => {
  let { resolvedData } = params;
  if (originalHook) {
    resolvedData = await originalHook(params);
  }
  return await newHook({ ...params, resolvedData });
};
module.exports = composeHook;
