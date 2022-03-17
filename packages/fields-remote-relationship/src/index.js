import { Relationship, MongoRelationshipInterface } from './Implementation';
const pkgDir = path.dirname(require.resolve('@itoa/fields-remote-relationship/package.json'));

export default {
  type: 'RemoteRelationship',
  isRelationship: true, // Used internally for this special case
  implementation: Relationship,
  views: {
    Controller: path.join(pkgDir, 'views/Controller'),
    Field: path.join(pkgDir, 'views/Field'),
    Filter: path.join(pkgDir, 'views/Filter'),
    Cell: path.join(pkgDir, 'views/Cell'),
  },
  adapters: {
    mongoose: MongoRelationshipInterface,
  },
};
