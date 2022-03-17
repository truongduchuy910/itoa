const templates = {
  List: (
    listKey,
    fieldsQuery,
  ) => `import { gql, makeVar, useQuery } from "@apollo/client";

export const query = gql\`
  query($first: Int, $skip: Int, $where: ${listKey}WhereInput) {
    _all${listKey}sMeta(where: $where) {
      count
    }
    all${listKey}s(first: $first, skip: $skip, where: $where) {
      id${fieldsQuery}
    }
  }
\`;

export default function ${listKey}List({ UI, children, first = 12, skip, where }) {
  var { data, error, loading, fetchMore } = useQuery(query, {
    variables: { first, skip, where },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { all${listKey}s = [], _all${listKey}sMeta } = data;
  const count = all${listKey}s.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_all${listKey}sMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        
        return {
          ...previousResult,
          all${listKey}s: [
            ...previousResult.all${listKey}s,
            ...fetchMoreResult.all${listKey}s,
          ],
        };
      },
    });
  }

  return (
    (
      <UI
        all${listKey}s={all${listKey}s}
        _all${listKey}sMeta={_all${listKey}sMeta}
        clickMore={clickMore}
      />
    ) || children({ all${listKey}s, _all${listKey}sMeta, clickMore })
  );
}
`,
  Item: (
    listKey,
    fieldsQuery,
  ) => `import { gql, useQuery } from "@apollo/client";

export const query = gql\`
  query($id: ID!) {
    ${listKey}(where: { id: $id }) {
      id${fieldsQuery}
    }
  }
\`;

export default function ${listKey}Item({ id, UI, children }) {
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ${listKey}: ${listKey.toLowerCase()} } = data;
  return <UI ${listKey.toLowerCase()}={${listKey.toLowerCase()}} /> || children({ ${listKey.toLowerCase()} });
}
`,
  Create: (
    listKey,
    fieldsQuery,
  ) => `import { gql, useMutation } from "@apollo/client";

export const mutation = gql\`
  mutation($data: ${listKey}CreateInput) {
    create${listKey}(data: $data) {
      id${fieldsQuery}
    }
  }
\`;

export default function ${listKey}Create({ UI, children, ${listKey.toLowerCase()} }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { create${listKey} } = data;
  return (
    <UI ${listKey.toLowerCase()}={${listKey.toLowerCase()}} on={on} create${listKey}={create${listKey}} /> ||
    children({ ${listKey.toLowerCase()}, on, create${listKey} })
  );
}
`,
  Update: (
    listKey,
    fieldsQuery,
  ) => `import { gql, useMutation } from "@apollo/client";

export const mutation = gql\`
  mutation ($id: ID!, $data: ${listKey}UpdateInput) {
    update${listKey}(id: $id, data: $data) {
      id${fieldsQuery}
    }
  }
\`;

export default function ${listKey}Update({ UI, children, ${listKey.toLowerCase()} }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { update${listKey} } = data;
  return (
    <UI ${listKey.toLowerCase()}={${listKey.toLowerCase()}} on={on} update${listKey}={update${listKey}} /> ||
    children({ ${listKey.toLowerCase()}, on, update${listKey} })
  );
}
`,
  Delete: (
    listKey,
    fieldsQuery,
  ) => `import { gql, useMutation } from "@apollo/client";

export const mutation = gql\`
  mutation ($id: ID!) {
    delete${listKey}(id: $id) {
      id${fieldsQuery}
    }
  }
\`;

export default function ${listKey}Delete({ UI, children, ${listKey.toLowerCase()} }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { delete${listKey} } = data;
  return (
    <UI ${listKey.toLowerCase()}={${listKey.toLowerCase()}} on={on} delete${listKey}={delete${listKey}} /> ||
    children({ ${listKey.toLowerCase()}, on, delete${listKey} })
  );
}
`,
  UI: {
    List: (listKey, fieldsQuery) => `export default function ${listKey}ListUI({
  all${listKey}s,
  _all${listKey}sMeta,
  clickMore,
}) {
  return <pre>Incomplete component.</pre>;
}
`,
    Item: (
      listKey,
      fieldsQuery,
    ) => `export default function ${listKey}ItemUI({ ${listKey.toLowerCase()} }) {
  return <pre>Incomplete component.</pre>;
}
`,
    Create: (
      listKey,
      fieldsQuery,
    ) => `export default function ${listKey}CreateUI({ ${listKey.toLowerCase()}, on }) {
  return <pre>Incomplete component.</pre>;
}
`,
    Update: (
      listKey,
      fieldsQuery,
    ) => `export default function ${listKey}UpdateUI({ ${listKey.toLowerCase()}, on }) {
  return <pre>Incomplete component.</pre>;
}
`,
    Delete: (
      listKey,
      fieldsQuery,
    ) => `export default function ${listKey}DeleteUI({ ${listKey.toLowerCase()}, on }) {
  return <pre>Incomplete component.</pre>;
}
`,
  },
};
module.exports = { templates };
