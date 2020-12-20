import React from "react";
import ReactDOM from "react-dom";
import createRouter from "router5";
import browserPlugin from "router5-plugin-browser";
import { RouterProvider } from "react-router5";

export function runApp(dir) {
	const { App, routes } = resolveApp(dir);
	
	const router = createRouter(routes);
	router.usePlugin(browserPlugin());
	router.start();

	hydrate(router)
}

export function hydrate(router) {
	ReactDOM.hydrate(
	  <RouterProvider router={router}>
	    <App />
	  </RouterProvider>,
	  document.getElementById("root")
	);
}