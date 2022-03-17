require('./environment')
const { schemas } = require("./itoa");

test("Schemas fields", () => {
  schemas.map(({ schema }) => {
    expect(schema.fields).toBeTruthy();
  });
});
