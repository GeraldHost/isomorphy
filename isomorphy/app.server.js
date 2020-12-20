import Koa from "koa";
import path from "path";
import React from "react";
import { join } from "path";
import cors from "@koa/cors";
import serve from "koa-static";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import ReactDOMServer from "react-dom/server";
import { RouterProvider } from "react-router5";

import { resolveApp } from "./config";
import { createRouter, startRouter } from "./router";
import { SERVER_DIR, PORT, BUILD_DIR } from "./constants";

export const app = new Koa();
export const serverRouter = new Router();

export const render = (dir, App) => {
  const app = (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );

  const html = ReactDOMServer.renderToString(app);
  return { html };
};

export const prepare = async (dir, routes, router) => {
  console.log("Preparing application");
  await startRouter(router, "/");
  routes.forEach((route) => {
    router.navigate(route.name);
    console.log("preparing", route.name);
    render(dir, router);
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
  await prepare(dir, routes, clientRouter);
  global.preparing = false;

  serverRouter.get(/./, async (ctx) => {
    await startRouter(clientRouter, ctx.request.url);
    const { html } = render(dir, clientRouter);
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
