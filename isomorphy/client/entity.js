import { isServer } from "./utils";

const dummyHandler = (name) => (ctx) => {
  ctx.body = name;
};

let createEndpoints;
serveronly: createEndpoints = (name, config) => {
  const { serverRouter: router, validator } = require("../server");
  router
    .get(`/entity/${name}`, dummyHandler(name))
    .post(`/entity/${name}`, validator(config.schema), dummyHandler(name));
};

const createTable = (name, config) => {};

export const useEntity = (name, config) => {
  serveronly: if (isServer()) {
    createEndpoints(name, config);
    createTable(name, {});
  }

  return () => {};
};
