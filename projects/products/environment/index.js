const dotenv = require("dotenv");
const mode = process.env.NODE_ENV;
const path = __dirname + "/.env." + mode;
dotenv.config({ path });