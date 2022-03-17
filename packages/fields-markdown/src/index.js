import path from 'path';
import { Text } from '@itoa/fields';

const pkgDir = path.dirname(require.resolve('@itoa/fields-markdown/package.json'));

export let Markdown = {
  type: 'Markdown',
  implementation: Text.implementation,
  views: {
    Controller: Text.views.Controller,
    Field: path.join(pkgDir, 'views/Field'),
    Filter: Text.views.Filter,
  },
  adapters: Text.adapters,
};
