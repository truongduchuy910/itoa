import { Text } from '../../';
import { resolveView } from '../../resolve-view';

export default {
  type: 'Editor',
  implementation: Text.implementation,
  views: {
    Controller: Text.views.Controller,
    Field: resolveView('types/Editor/views/Field'),
    Filter: Text.views.Filter,
  },
  adapters: Text.adapters,
};
