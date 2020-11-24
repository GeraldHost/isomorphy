import babel from "@babel/register";

babel({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

import { startServer } from "../isomorphy";

startServer(".");

