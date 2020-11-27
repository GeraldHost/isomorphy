import { isServer } from "./utils";

const dummyHandler = (name) => (ctx) => {
  ctx.body = name;
};

const createEndpoints = (router, name) => {
  router.get(`/entity/${name}`, dummyHandler(name));
};

const createTable = (name, config) => {};

export const useEntity = (name) => {
  /* serveronly:start */
  if (isServer()) {
    const serverRouter = require("../server").serverRouter;
    createEndpoints(serverRouter, name);
    createTable(name, {});
  }
  /* serveronly:end */

  return () => {};
};
