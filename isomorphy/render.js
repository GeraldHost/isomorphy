import { join } from "path";
import React from "react";
import { StaticRouter } from "react-router";
import ReactDOMServer from "react-dom/server";

const SERVER_DIR = "..";

export const resolveApp = (dir) => {
  return require(join(SERVER_DIR, dir, "src", "app.js")).default; 
};

export const render = (dir, url) => {
  const App = resolveApp(dir);
  const app = (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  // TODO: convert routes to array
  // for each route render the page and save the output
  // for now lets just get it working with one route
  return ReactDOMServer.renderToString(app);
};