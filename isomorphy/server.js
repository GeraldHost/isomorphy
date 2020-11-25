import Koa from "koa";
import Router from "koa-router";

import { render } from "./render";
import { prepare } from "./app";
import { createRouter, startRouter } from "./router";

const PORT = process.env.PORT || 4000;

export const startServer = async (dir, routes) => {
  const app = new Koa();
  const serverRouter = new Router();

  const clientRouter = createRouter(routes);
  await prepare(dir, routes, clientRouter);

  serverRouter.get(/./, async (ctx, next) => {
    await startRouter(clientRouter, ctx.request.url);
    ctx.body = render(dir, clientRouter);
    clientRouter.stop();
  });

  app.use(serverRouter.routes()).use(serverRouter.allowedMethods());

  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
};
