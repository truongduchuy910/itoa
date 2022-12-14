const getContext = itoa => itoa.createContext({ schemaName: 'public', authentication: {} }).sudo();

const runQuery = async ({ itoa, query, variables, context = getContext(itoa) }) => {
  const { data, errors } = await context.executeGraphQL({
    query,
    variables,
  });

  if (errors) throw errors[0];
  return data;
};

const _runChunkedMutation = async ({ query, gqlName, pageSize, items, context }) => {
  if (pageSize <= 0) pageSize = 1;

  const chunks = items.reduce((accum, item, index) => {
    const chunkIndex = Math.floor(index / pageSize);

    if (!accum[chunkIndex]) {
      accum[chunkIndex] = [];
    }

    accum[chunkIndex].push(item);

    return accum;
  }, []);

  const result = await Promise.all(
    chunks.map(chunk => runQuery({ query, variables: { items: chunk }, context }))
  );

  /*
   * The result is of the format: [{createUsers: [{id: '123', name: 'aman'}]}, {createUsers: [{id: '456', name: 'mike'}]}].
   * We need to combine all objects into one array keyed by the `createUsers`, such that, the output is: [{id: '123', name: 'aman'}, {id: '456', name: 'Mike'}]
   */

  return [].concat(...result.map(item => item[gqlName]));
};

const createItem = async ({
  itoa,
  listKey,
  item,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { createMutationName, createInputName } = context.gqlNames(listKey);

  const query = `mutation ($item: ${createInputName}){
    ${createMutationName}(data: $item) { ${returnFields} }
  }`;

  const result = await runQuery({ itoa, query, variables: { item }, context });
  return result[createMutationName];
};

const createItems = async ({
  itoa,
  listKey,
  items,
  pageSize = 500,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { createManyMutationName, createManyInputName } = context.gqlNames(listKey);

  const query = `mutation ($items: [${createManyInputName}]){
    ${createManyMutationName}(data: $items) { ${returnFields} }
  }`;

  return _runChunkedMutation({
    query,
    items,
    pageSize,
    gqlName: createManyMutationName,
    context,
  });
};

const getItem = async ({
  itoa,
  listKey,
  itemId,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { itemQueryName } = context.gqlNames(listKey);

  const query = `query ($id: ID!) { ${itemQueryName}(where: { id: $id }) { ${returnFields} }  }`;
  const result = await runQuery({ query, variables: { id: itemId }, context });
  return result[itemQueryName];
};

const getItems = async ({
  itoa,
  listKey,
  where = {},
  sortBy,
  first,
  skip,
  pageSize = 500,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { listQueryName, whereInputName, listSortName } = context.gqlNames(listKey);

  let query;
  if (sortBy) {
    query = `query ($first: Int!, $skip: Int!, $sortBy: [${listSortName}!], $where: ${whereInputName}) { ${listQueryName}(first: $first, skip: $skip, sortBy: $sortBy, where: $where) { ${returnFields} }  }`;
  } else {
    query = `query ($first: Int!, $skip: Int!, $where: ${whereInputName}) { ${listQueryName}(first: $first, skip: $skip, where: $where) { ${returnFields} }  }`;
  }

  let latestResult;
  let _skip = skip || 0;

  let _first = pageSize;
  const allItems = [];

  do {
    // Making sure we are not over fetching
    if (first && allItems.length + _first > first) {
      _first = first - allItems.length;
    }
    const response = await runQuery({
      query,
      context,
      variables: { first: _first, skip: _skip, sortBy, where },
    });

    latestResult = response[Object.keys(response || {})[0]];

    allItems.push(...latestResult);

    _skip += pageSize;
  } while (latestResult.length === _first && (first === undefined || allItems.length < first));

  return allItems;
};

const updateItem = async ({
  itoa,
  listKey,
  item,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { updateMutationName, updateInputName } = context.gqlNames(listKey);

  const query = `mutation ($id: ID!, $data: ${updateInputName}){
    ${updateMutationName}(id: $id, data: $data) { ${returnFields} }
  }`;

  const result = await runQuery({
    query,
    variables: { id: item.id, data: item.data },
    context,
  });

  return result[updateMutationName];
};

const updateItems = async ({
  itoa,
  listKey,
  items,
  pageSize = 500,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { updateManyMutationName, updateManyInputName } = context.gqlNames(listKey);

  const query = `mutation ($items: [${updateManyInputName}]){
    ${updateManyMutationName}(data: $items) { ${returnFields} }
  }`;
  return _runChunkedMutation({
    query,
    items,
    pageSize,
    gqlName: updateManyMutationName,
    context,
  });
};

const deleteItem = async ({
  itoa,
  listKey,
  itemId,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { deleteMutationName } = context.gqlNames(listKey);

  const query = `mutation ($id: ID!){
    ${deleteMutationName}(id: $id) { ${returnFields} }
  }`;

  const result = await runQuery({ query, variables: { id: itemId }, context });
  return result[deleteMutationName];
};

const deleteItems = async ({
  itoa,
  listKey,
  items,
  pageSize = 500,
  returnFields = `id`,
  context = getContext(itoa),
}) => {
  const { deleteManyMutationName } = context.gqlNames(listKey);

  const query = `mutation ($items: [ID!]){
    ${deleteManyMutationName}(ids: $items) {
      ${returnFields}
    }
  }`;

  return _runChunkedMutation({
    query,
    items,
    pageSize,
    gqlName: deleteManyMutationName,
    context,
  });
};

module.exports = {
  getItem,
  getItems,
  createItem,
  createItems,
  updateItem,
  updateItems,
  deleteItem,
  deleteItems,
  runCustomQuery: runQuery,
};
