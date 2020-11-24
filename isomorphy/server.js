import Koa from "koa";
import Router from "koa-router";

import { render } from "./render";

const PORT = process.env.PORT || 4000;

export const startServer = (dir) => {
	const app = new Koa();
	const router = new Router();

	router.get("/", (ctx) => {
	  ctx.body = render(dir, ctx.request.url);
	});

	app.use(router.routes()).use(router.allowedMethods());

	app.listen(PORT, () => {
	  console.log(`😎 Server is listening on port ${PORT}`);
	});
}
