const { gql } = require("@apollo/client");
async function beforeDelete(
  context,
  existingItem,
  operation,
  listKey,
  fieldPath
) {
  console.log(operation);
  const { id } = existingItem;
  const {
    data = {},
    errors: interactionError = [],
  } = await context.executeGraphQL({
    context,
    query: gql`
      query($id: ID!) {
        Interaction(where: { id: $id }) {
          id
          comments {
            id
            content
          }
          reactions {
            id
            emoji
          }
        }
      }
    `,
    variables: { id },
    skipAccessControl: true,
  });
  if (interactionError || interactionError.length) {
    interactionError.map((error) => {
      console.log(error);
    });
  }
  const { Interaction } = data;
  const { comments = [], reactions = [] } = Interaction;
  comments.map((comment) => {
    const commentId = comment.id;
    const { data = {}, errors = [] } = context.executeGraphQL({
      context,
      query: gql`
        mutation($commentId: ID!) {
          deleteInteractionComment(id: $commentId) {
            id
          }
        }
      `,
      variables: { commentId },
      skipAccessControl: true,
    });
    if (errors && errors.length) {
      errors.map((error) => {
        console.log(error);
      });
    }
  });
  reactions.map((reaction) => {
    const reactionId = reaction.id;
    const { data, errors = [] } = context.executeGraphQL({
      context,
      query: gql`
        mutation($reactionId: ID!) {
          deleteInteractionReaction(id: $reactionId) {
            id
          }
        }
      `,
      variables: { reactionId },
      skipAccessControl: true,
    });
    if (errors && errors.length) {
      errors.map((error) => {
        console.log(error);
      });
    }
  });
}
module.exports.hook = {
  beforeDelete,
};
