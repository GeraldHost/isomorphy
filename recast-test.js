const recast = require("recast");
const jsx = require("acorn-jsx");
const fs = require('fs');

const code = `
export const useEntity = (name, config) => {
  serveronly: if (isServer()) {
    createEndpoints(name, config);
    createTable(name, {});
  }

  return () => {};
};
`

const ast = recast.parse(code);

const isServerOnlyLabel = (body) => 
	body.type === "LabeledStatement" && body.label.name == "serveronly";

const hasDeclerations = (body) => 
	body.declaration && body.declaration.declarations.length > 0;

const hasBodies = (body) => 
	body.body && body.body.lenght > 0;

const modify = (body) => {
	if(hasDeclerations(body)){
		console.log("Has declarations");
		console.log(body.declaration.declarations[0]);
		body.declaration.declarations = body.declaration.declarations.map(d => {
    		d.init.body = pass(d.init.body);
    		return d;
    	});
	}
	if(hasBodies(body)){
		console.log("Has bodies");
		body.body = pass(body.body);
	}
	return body;
}

const pass = (body) => {
	if(Array.isArray(body)) {
		return body.reduce((acc, body) => {
			if(isServerOnlyLabel(body)) {
				return acc;
			}
			const modifiedBody = modify(body);
			return [...acc, modifiedBody];
		}, []);
	} else {
		return modify(body);
	}
}
// console.log(JSON.stringify(ast, null, 2));
ast.program.body = pass(ast.program.body);
const transformed = recast.print(ast).code;
console.log(transformed);
