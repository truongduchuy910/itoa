import { ServerResponse } from 'http';
import express from 'express';
// @ts-ignore
import supertest from 'supertest-light';
import MongoMemoryServer from 'mongodb-memory-server-core';
import url from 'url';
import { Itoa } from '@itoa/itoa';
// @ts-ignore
import { GraphQLApp } from '@itoa/app-graphql';
import { MongooseAdapter } from '@itoa/adapter-mongoose';
// @ts-ignore

export type AdapterName = 'mongoose';

const argGenerator = {
  mongoose: getMongoMemoryServerConfig,
};

async function setupServer({
  adapterName,
  schemaName = 'public',
  schemaNames = ['public'],
  createLists = () => {},
  itoaOptions,
  graphqlOptions = {},
}: {
  adapterName: 'mongoose';
  schemaName: string;
  schemaNames: string[];
  createLists: (args: Itoa<string>) => void;
  itoaOptions: Record<string, any>; // FIXME: should match args of Itoa constructor
  graphqlOptions: Record<string, any>; // FIXME: should match args of GraphQLApp constuctor
}) {
  const Adapter = {
    mongoose: MongooseAdapter,
  }[adapterName];

  const itoa = new Itoa({
    adapter: new Adapter(await argGenerator[adapterName]()),
    // @ts-ignore The @types/keystonejs__itoa package has the wrong type for ItoaOptions
    defaultAccess: { list: true, field: true },
    schemaNames,
    session: {
      secret: 'secretForTesting',
    },
    ...itoaOptions,
  });

  createLists(itoa);

  const apps = [
    new GraphQLApp({
      schemaName,
      apiPath: '/admin/api',
      graphiqlPath: '/admin/graphiql',
      apollo: {
        tracing: true,
        cacheControl: {
          defaultMaxAge: 3600,
        },
      },
      ...graphqlOptions,
    }),
  ];

  const { middlewares } = await itoa.prepare({ dev: true, apps });

  const app = express();
  app.use(middlewares);

  return { itoa, app };
}

function networkedGraphqlRequest({
  app,
  query,
  variables = undefined,
  headers = {},
  expectedStatusCode = 200,
  operationName,
}: {
  app: express.Application;
  query: string;
  variables?: Record<string, any>;
  headers: Record<string, any>;
  expectedStatusCode: number;
  operationName: string;
}) {
  const request = supertest(app).set('Accept', 'application/json');

  Object.entries(headers).forEach(([key, value]) => request.set(key, value));

  return request
    .post('/admin/api', { query, variables, operationName })
    .then((res: ServerResponse & { text: string }) => {
      expect(res.statusCode).toBe(expectedStatusCode);
      return { ...JSON.parse(res.text), res };
    })
    .catch((error: Error) => ({
      errors: [error],
    }));
}

// One instance per node.js thread which cleans itself up when the main process
// exits
let mongoServer: MongoMemoryServer | undefined | null;
let mongoServerReferences = 0;

async function getMongoMemoryServerConfig() {
  mongoServer = mongoServer || (await MongoMemoryServer.create());
  mongoServerReferences++;
  // Passing `true` here generates a new, random DB name for us
  const mongoUri = await mongoServer.getUri();
  // In theory the dbName can contain query params so lets parse it then extract the db name
  const dbName = url.parse(mongoUri).pathname!.split('/').pop();

  return { mongoUri, dbName };
}

async function teardownMongoMemoryServer() {
  mongoServerReferences--;
  if (mongoServerReferences < 0) {
    mongoServerReferences = 0;
  }

  if (mongoServerReferences > 0) {
    return Promise.resolve();
  }

  if (!mongoServer) {
    return Promise.resolve();
  }
  await mongoServer.stop();
  mongoServer = null;
}

type Setup = { itoa: Itoa<string>; context: any };

function _itoaRunner(adapterName: AdapterName, tearDownFunction: () => Promise<void> | void) {
  return function (
    setupItoaFn: (adaptername: AdapterName) => Promise<Setup>,
    testFn: (setup: Setup) => Promise<void>
  ) {
    return async function () {
      if (!testFn) {
        // If a testFn is not defined then we just need
        // to excute setup and tear down in isolation.
        try {
          await setupItoaFn(adapterName);
        } catch (error) {
          await tearDownFunction();
          throw error;
        }
        return;
      }
      const setup = await setupItoaFn(adapterName);
      const { itoa } = setup;

      await itoa.connect();

      try {
        await testFn(setup);
      } finally {
        await itoa.disconnect();
        await tearDownFunction();
      }
    };
  };
}

function _before(adapterName: AdapterName) {
  return async function (
    setupItoa: (adapterName: AdapterName) => Promise<{ itoa: Itoa<string>; app: any }>
  ) {
    const { itoa, app } = await setupItoa(adapterName);
    await itoa.connect();
    return { itoa, app };
  };
}

function _after(tearDownFunction: () => Promise<void> | void) {
  return async function (itoa: Itoa<string>) {
    await itoa.disconnect();
    await tearDownFunction();
  };
}

function multiAdapterRunners(only = process.env.TEST_ADAPTER) {
  return [
    {
      runner: _itoaRunner('mongoose', teardownMongoMemoryServer),
      adapterName: 'mongoose',
      before: _before('mongoose'),
      after: _after(teardownMongoMemoryServer),
    },
  ].filter(a => typeof only === 'undefined' || a.adapterName === only);
}

export { setupServer, multiAdapterRunners, networkedGraphqlRequest };
