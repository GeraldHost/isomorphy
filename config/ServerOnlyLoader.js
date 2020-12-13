/*jslint node:true */
"use strict";

const recast = require("recast");

function ServerOnlyLoader(code) {
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
  return recast.print(ast).code;
}

module.exports = ServerOnlyLoader;
