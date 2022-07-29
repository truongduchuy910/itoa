const plugins = require("@itoa/list-plugins");
const ipTracking = require("./ipTracking");
const regex = require("./regex");
const { singleton } = require("./singleton");
module.exports = {
  ...plugins,
  ipTracking,
  singleton,
  regex,
};
