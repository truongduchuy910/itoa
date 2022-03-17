const { GraphQLClient, gql } = require("graphql-request");
const client = new GraphQLClient("https://ecom.itoa.vn/admin/api", {
  headers: { as: "mayberoom.vn" },
});
client
  .request(
    gql`
      query {
        allProductCategories {
          id
        }
      }
    `,
  )
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error.toString());
  });
