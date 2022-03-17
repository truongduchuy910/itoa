const { MongoId } = require('@itoa/fields-mongoid');
const { composeHook } = require('../utils');

const _byTracking =
  ({ created = true, updated = true }) =>
  ({ updatedByField = 'updatedBy', createdByField = 'createdBy', ...byFieldOptions } = {}) =>
  ({ fields = {}, hooks = {}, ...rest }) => {
    const relationshipOptions = {
      type: MongoId,
      adminConfig: { className: 'col-sm-12 col-md-6', isReadOnly: true },
      ...byFieldOptions,
    };

    if (updated) {
      fields[updatedByField] = {
        ...relationshipOptions,
      };
    }

    if (created) {
      fields[createdByField] = {
        ...relationshipOptions,
      };
    }

    const newResolveInput = ({ resolvedData, operation, context }) => {
      if (
        // opted-in to updatedBy tracking
        updated &&
        // this is an update
        operation === 'update'
      ) {
        // If not logged in, the id is set to `null`
        const { authedItem: { id = null } = {} } = context;
        resolvedData[updatedByField] = id;
      }

      if (
        // opted-in to createdBy tracking
        created &&
        // this is an create
        operation === 'create'
      ) {
        // If not logged in, the id is set to `null`
        const { authedItem: { id = null } = {} } = context;
        resolvedData[createdByField] = id;
      }

      return resolvedData;
    };
    const originalResolveInput = hooks.resolveInput;
    hooks.resolveInput = composeHook(originalResolveInput, newResolveInput);
    return { fields, hooks, ...rest };
  };

const createdBy = options => _byTracking({ created: true, updated: false })(options);
const updatedBy = options => _byTracking({ created: false, updated: true })(options);
const byTracking = options => _byTracking({ created: true, updated: true })(options);

module.exports = { createdId: createdBy, updatedId: updatedBy, idTracking: byTracking };
