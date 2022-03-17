const { api } = require('./intergrate')
test("Apollo client version", () => {
  expect(api.version).toBe("3.5.6");
});
