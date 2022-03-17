import { Text } from '@itoa/fields';
import path from 'path';

const pkgDir = path.dirname(require.resolve('@itoa/fields-color/package.json'));

export const Color = {
  type: 'Color',
  implementation: Text.implementation,
  views: {
    Controller: Text.views.Controller,
    Field: path.join(pkgDir, 'views/Field'),
    Cell: path.join(pkgDir, 'views/Cell'),
    Filter: Text.views.Filter,
  },
  adapters: Text.adapters,
};
