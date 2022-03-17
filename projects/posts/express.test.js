const request = require("supertest");
const express = require("express");
const app = express();
const { configs, configureExpress } = require("./express");
configureExpress(app);

describe("Request handlers", () => {
  configs.map((config) => {
    const { route } = config;
    test(route, () => {
      request(app)[config.file](route).expect(200);
    });
  });
});
