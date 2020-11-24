import { app } from "./server";
import Router from "koa-router";
import { isServer } from "./utils";

const createDatabaseEntity = (name, schema) => {
  console.log("create database entity", name);
};

const dummyHandler = (ctx) => {
  ctx.body = "dummy handler";
};

const createEntityRoutes = (name) => {
  const router = new Router();
  router
    .get(`/${name}`, dummyHandler)
    .post(`/${name}`, dummyHandler)
    .put(`/${name}/:id`, dummyHandler)
    .del(`/${name}/:id`, dummyHandler);

  app.use(router.routes()).use(router.allowedMethods());
};

const createEntity = (name, opts) => {
  createEntityRoutes(name);
  createDatabaseEntity(name, opts.schema);
};

export const useEntity = (name, opts) => {
  if (isServer()) {
    createEntity(name, opts);
  }
  return name;
};
