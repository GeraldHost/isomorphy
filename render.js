import React from "react";
import { StaticRouter } from "react-router";
import ReactDOMServer from "react-dom/server";

export const resolveApp = () => {
  return require("./app.js").default;
};

export const render = (url) => {
  const App = resolveApp();
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
