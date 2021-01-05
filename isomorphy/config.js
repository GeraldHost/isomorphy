import { join } from "path"
import { SERVER_DIR } from "./constants";

export function resolveApp(dir) {
  const { default: App, routes } = require(join(SERVER_DIR, dir, "src", "app.js"));
  return { App, routes };
};

export function readConfig() {
	// implement
}
