import path from "path";
import React from "react";
import { StaticRouter } from "react-router";
import ReactDOMServer from "react-dom/server";

export const resolveApp = (dir) => {
  const _path = path.resolve(dir, "src", "app.js");
  console.log({_path});
  return require(_path).default;  
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
