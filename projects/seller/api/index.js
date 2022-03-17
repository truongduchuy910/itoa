const { Itoa } = require("@itoa/itoa");
const axios = require("axios").default;
const Gnh = require("./Ghn");
/**
 * Api làm biến đổi tham chiếu itoajs
 */
class Api {
  /**
   *
   * @param {Itoa} itoa
   * @returns {Itoa}
   */
  extendGraphQLSchema(itoa) {
    itoa.extendGraphQLSchema(new Gnh().config);
  }
}
module.exports = { Api };
