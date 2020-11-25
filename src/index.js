import { startServer } from "../isomorphy";

const routes = [
  { name: "home", path: "/" },
  { name: "foo", path: "/foo" },
];

startServer(".", routes);
