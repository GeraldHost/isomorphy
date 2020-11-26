import React from "react";
import ReactDOMServer from "react-dom/server";
import { RouterProvider } from "react-router5";
import { resolveApp } from "./app";

export const render = (dir, router) => {
  const App = resolveApp(dir);
  const app = (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );

  // TODO: convert routes to array
  // for each route render the page and save the output
  // for now lets just get it working with one route
  const html = ReactDOMServer.renderToString(app);
  return { html };
};
