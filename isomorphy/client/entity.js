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

let createTable;
serveronly: createTable = (name, config) => {
  const knex = require("../knex").default;
  knex.schema
    .hasTable(name)
    .then((e) => console.log(`${name} ${e ? "does" : "does not"} exist`));
};

export const useEntity = (name, config) => {
  serveronly: if (isServer()) {
    createEndpoints(name, config);
    createTable(name, {});
  }

  return () => {};
};
