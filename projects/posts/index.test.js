const { schemas } = require("./itoa");

test("schemas", () => {
  schemas.map(({ schema }) => {
    expect(schema.fields).toBeTruthy();
  });
});
