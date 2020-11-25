import createRouterFive from "router5";
import browserPlugin from "router5-plugin-browser";

export { useRoute } from 'react-router5'

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
