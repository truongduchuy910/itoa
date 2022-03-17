require('./environment')
const { extendSchemas } = require("./itoa");
describe("Extend schemas", () => {
  extendSchemas.map(({ config, schema }) => {
    test(config.name, () => {
      expect(schema.types).toBeTruthy();
      expect(schema.queries).toBeTruthy();
    });
  });
});
