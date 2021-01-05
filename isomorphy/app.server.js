import Koa from "koa";
import path from "path";
import React from "react";
import cors from "@koa/cors";
import serve from "koa-static";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import ReactDOMServer from "react-dom/server";
import { RouterProvider } from "react-router5";

import { resolveApp } from "./config";
import { createRouter, startRouter } from "./router";
import { PORT, BUILD_DIR } from "./constants";

export const app = new Koa();
export const serverRouter = new Router();

export const render = (App, router) => {
  const app = (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );

  const html = ReactDOMServer.renderToString(app);
  return { html };
};

export const prepare = async (App, router, routes) => {
  await startRouter(router, "/");
  routes.forEach((route) => {
    router.navigate(route.name);
    render(App, router);
  });
  router.stop();
};

const generateHtml = (app, clientBundlePath) => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>App Title</title>
    </head>

    <body>
      <div id="root">${app}</div>
      <footer>
        <script type="text/javascript" src="${clientBundlePath}"></script>
      </footer>
    </body>
    </html>
  `;
};

export const runApp = async (dir) => {
  const { App, routes } = resolveApp(dir);

  const clientRouter = createRouter(routes);

  global.preparing = true;
  await prepare(App, clientRouter, routes);
  global.preparing = false;

  serverRouter.get(/./, async (ctx) => {
    await startRouter(clientRouter, ctx.request.url);
    const { html } = render(App, clientRouter);
    const markup = generateHtml(html, "bundle.js");
    ctx.body = markup;
    clientRouter.stop();
  });

  app.use(bodyParser());
  app.use(cors());

  app.use(serve(path.resolve(BUILD_DIR, "client")));
  app.use(serverRouter.routes()).use(serverRouter.allowedMethods());

  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
};
