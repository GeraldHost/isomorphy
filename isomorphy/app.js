import { join } from "path";
import { render } from "./render";
import { startRouter } from "./router";

const SERVER_DIR = "..";

export const resolveApp = (dir) => {
  return require(join(SERVER_DIR, dir, "src", "app.js")).default;
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
