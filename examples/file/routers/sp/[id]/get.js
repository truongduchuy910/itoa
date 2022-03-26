const { itoa } = require("../../../itoa");
const { gql } = require("@apollo/client");
const Express = require("express");
/**
 * EXPRESS REQUEST HANDLER
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
async function handler(req, res) {
  const { id } = req.params;
  const { data } = await itoa.executeGraphQL({
    context: itoa.createContext({ skipAccessControl: true }),
    query: gql`
      query($id: ID!) {
        Product(where: { id: $id }) {
          url
          categories {
            url
          }
          createdBy {
            domain
          }
        }
      }
    `,
    variables: { id },
  });
  console.log(data);
  if (!data) res.redirect("/");
  const {
    Product: {
      url,
      categories = [],
      createdBy: { domain },
    },
  } = data;
  const [category = {}] = categories;
  res.redirect(`http://${domain}/san-pham/${category.url || "_"}/${url}`);
}
module.exports = { handler };
