import Koa from "koa";
import path from "path";
import Router from "koa-router";
import serve from "koa-static";

import { render } from "./render";
import { prepare } from "./app";
import { createRouter, startRouter } from "./client/router";

const PORT = process.env.PORT || 4000;
const BUILD_DIR = "build";

export const app = new Koa();
export const serverRouter = new Router();

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

export const startServer = async (dir, routes) => {
  const clientRouter = createRouter(routes);
  await prepare(dir, routes, clientRouter);

  serverRouter.get(/./, async (ctx) => {
    await startRouter(clientRouter, ctx.request.url);
    const { html } = render(dir, clientRouter);
    const markup = generateHtml(html, "bundle.js");
    ctx.body = markup;
    clientRouter.stop();
  });

  app.use(serve(path.resolve(BUILD_DIR, "client")));
  app.use(serverRouter.routes()).use(serverRouter.allowedMethods());

  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
};
