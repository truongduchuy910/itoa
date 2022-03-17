import path from 'path';
import { MongoIdImplementation, MongooseMongoIdInterface } from './Implementation';
import { Text } from '@itoa/fields';

const pkgDir = path.dirname(require.resolve('@itoa/fields-mongoid/package.json'));

export const MongoId = {
  type: 'MongoId',
  implementation: MongoIdImplementation,
  views: {
    Controller: path.join(pkgDir, 'views/Controller'),
    Field: Text.views.Field,
    Filter: path.join(pkgDir, 'views/Filter'),
  },
  adapters: {
    mongoose: MongooseMongoIdInterface,
  },
  primaryKeyDefaults: {
    mongoose: {
      getConfig: () => ({ type: MongoId }),
    },
  },
};
