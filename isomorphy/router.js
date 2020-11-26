import React from "react";
import createRouterFive from "router5";
import browserPlugin from "router5-plugin-browser";

import { useRoute as useRoute5 } from "react-router5";

export const useRoute = useRoute5;

export const createRouter = (routes) => {
  const router = createRouterFive(routes);
  router.usePlugin(browserPlugin());
  return router;
};

export const startRouter = (router, initialRoute) => {
  return new Promise((resolve, reject) => {
    router.start(initialRoute, (error, state) => {
      if (error) {
        reject(error);
      }
      resolve(state);
    });
  });
};

export const Link = ({ to, onClick, ...props }) => {
  const { router } = useRoute5();

  const handleClick = (event, ...args) => {
    if (onClick) {
      onClick(event, ...args);
      return;
    }
    event.preventDefault();
    router.navigate(to);
  };

  return <a {...props} href={to} onClick={handleClick} />;
};
