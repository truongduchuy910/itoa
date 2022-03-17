require('./environment')
const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const { reads } = require("./lib/files");
const path = require("path");
const configs = reads("", "./routers", [".js"], ["default", "post", "get"]).map(
  (config) => {
    config.path = config.path.replace(/\\/g, "/").replace(/\/\//g, "/");
    config.route = config.dir
      .replace(/\\/g, "/")
      .replace(/\[\[\.\.\./g, ":")
      .replace(/]]/g, "/*")
      .replace(/\[/g, ":")
      .replace(/]/g, "");
    return config;
  },
);
const period = 60 * 5;
/**
 * ROUTERS
 * @param {express.Router} app
 */
function configureExpress(app) {
  app.set("trust proxy", true);
  app.use(express.static(path.join(__dirname, "public"), { maxAge: period }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  configs.map((config) => {
    const { handler } = require(config.path);
    app[config.file](config.route, handler);
  });
  return app;
}

module.exports = { configs, configureExpress };
