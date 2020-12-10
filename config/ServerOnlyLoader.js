/*jslint node:true */
"use strict";

const recast = require("recast");
const loaderUtils = require("loader-utils");
const jsx = require("acorn-jsx");

function ServerOnlyLoader(code) {
  const options = loaderUtils.getOptions(this) || {};

  const ast = recast.parse(code, {
    parser: {
      parse(source) {
        return require("acorn").Parser.extend(jsx()).parse(source);
      },
    },
  });
  const transformed = recast.print(ast).code;

  console.log("---------- START ----------");
  console.log(transformed);
  console.log("---------- END ----------");

  return code;
}

module.exports = ServerOnlyLoader;
