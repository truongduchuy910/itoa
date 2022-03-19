const { gql } = require("@apollo/client");
async function afterCreate(context, resolvedData, listKey, fieldKey, operation, inputData, item, originalInput, updatedItem, fieldPath) {
    //const context = keystone.createContext({ skipAccessControl: true });
    if (operation === 'update') return;
    const { id } = fieldPath;
    const id_comment = id;
    const {
        //data: { createInteraction },
        data = {},
        errors: createInteractionError = [],
    } = await context.executeGraphQL({
        context,
        query: gql`
        mutation {
            createInteraction(data: { comments: null, reactions: null }) {
              id
            }
        }
        `,
        //variables: { id },
        skipAccessControl: true,
    });
    const { createInteraction } = data
    if (createInteractionError && createInteractionError.length) {
        createInteractionError.map((error) => {
            console.log(error);
        });
    }
    const id_interaction = createInteraction.id
    const {
        //data: { },
        errors: updateInteractionCommentError = [],
    } = await context.executeGraphQL({
        context,
        query: gql`
        mutation($id_comment: ID!, $id_interaction: ID!) {
            updateInteractionComment(
              id: $id_comment
              data: { my_interaction: { connect: { id: $id_interaction } } }
            ) {
              id
              my_interaction {
                id
              }
            }
          }
        `,
        variables: { id_comment, id_interaction },
        skipAccessControl: true,
    });
    if (updateInteractionCommentError && updateInteractionCommentError.length) {
        updateInteractionCommentError.map((error) => {
            console.log(error);
        });
    }
}
async function beforeDelete(context, existingItem, operation, listKey, fieldPath) {
    const { id } = existingItem;
    //const context = itoa.createContext({ skipAccessControl: true });
    const {
        data = {},
        errors: commentError = [],
    } = await context.executeGraphQL({
        context,
        query: gql`
            query($id: ID!) {
                InteractionComment(where: { id: $id }) {
                my_interaction {
                    id
                }
                }
            }     
        `,
        variables: { id },
        skipAccessControl: true,
    });
    if (commentError && commentError.length) {
        commentError.map((error) => {
            console.log(error);
        });
    }
    const { InteractionComment } = data
    const interactionId = InteractionComment.my_interaction.id
    const {
        data: { },
        errors = [],
    } = await context.executeGraphQL({
        context,
        query: gql`
        mutation($interactionId: ID!) {
          deleteInteraction(id: $interactionId) {
            comments {
              id
            }
            reactions {
              id
            }
          }
        }     
      `,
        variables: { interactionId },
        skipAccessControl: true,
    });
    if (errors && errors.length) {
        errors.map((error) => {
            console.log(error);
        });
    }
}
module.exports.content = {
    beforeDelete: ({ context, existingItem, operation, listKey, fieldPath }) => { beforeDelete(context, existingItem, operation, listKey, fieldPath) },
    afterChange: ({ context, resolvedData, listKey, fieldKey, operation, inputData, item, originalItem, originalInput, updatedItem, fieldPath }) => { afterCreate(context, resolvedData, listKey, fieldKey, operation, inputData, item, originalItem, originalInput, updatedItem, fieldPath) }
};