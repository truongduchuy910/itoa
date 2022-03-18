const { Text, Relationship, Virtual } = require("@itoa/fields");
module.exports = {
  active: true,
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true,
      label: "Tên truy cập",
    },
  },
};
/**
 * authentication	The currently authenticated user.
 * authentication.item	The details of the current user. Will be undefined for anonymous users.
 * authentication.listKey	The list key of the currently authenticated user. Will be undefined for anonymous users.
 * listKey	The key of the list being operated on.
 * operation	The CRUDA operation being performed ('create', 'read', 'update', 'delete', 'auth').
 * originalInput	For create and update mutations, this is the data as passed in the mutation.
 * gqlName	The name of the query or mutation which triggered the access check.
 * itemId	The id of the item being updated/deleted in singular update and delete operations.
 * itemIds	The ids of the items being updated/deleted in multiple update and delete operations.
 * context	The context of the originating GraphQL operation.
 */
