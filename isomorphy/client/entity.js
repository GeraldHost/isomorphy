import { isServer } from "./utils";

const dummyHandler = (name) => (ctx) => {
  ctx.body = name;
};

/* serveronly:start */
const createEndpoints = (name, config) => {
  const { serverRouter: router, validator } = require("../server");
  router
    .get(`/entity/${name}`, dummyHandler(name))
    .post(`/entity/${name}`, validator(config.schema), dummyHandler(name));
};
/* serveronly:end */

const createTable = (name, config) => {};

export const useEntity = (name, config) => {
  /* serveronly:start */
  if (isServer()) {
    createEndpoints(name, config);
    createTable(name, {});
  }
  /* serveronly:end */

  return () => {};
};
