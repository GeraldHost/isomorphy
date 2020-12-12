/*jslint node:true */
"use strict";

const recast = require("recast");
const loaderUtils = require("loader-utils");
const jsx = require("acorn-jsx");

function ServerOnlyLoader(code) {
  console.log("---------- FILE START ----------");
  console.log("code", code);
  const options = loaderUtils.getOptions(this) || {};

  const ast = recast.parse(code);
  const remove = (body) => {
    return body.reduce((acc, body) => {
      const type = body.type;
      if (type === "LabeledStatement") {
        const name = body.label.name;
        if (name == "serveronly") {
          return acc;
        }
      }
      const transformedBody =
        body.body && Array.isArray(body.body) ? remove(body) : body;
      return [...acc, transformedBody];
    }, []);
  };

  ast.program.body = remove(ast.program.body);
  const transformed = recast.print(ast).code;
  console.log("transformed", transformed);
  console.log("---------- FILE START ----------");
  return transformed;
}

module.exports = ServerOnlyLoader;
