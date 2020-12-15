import { isServer } from "./utils";

const dummyHandler = (name) => (ctx) => {
  ctx.body = name;
};

let createEndpoints;
serveronly: createEndpoints = (name, config) => {
  const { serverRouter: router, validator } = require("../server");
  router
    .get(`/entity/${name}`, dummyHandler(name))
    .post(`/entity/${name}`, validator(config.schema), dummyHandler(name));
};

let createTable;
serveronly: createTable = async (name, config) => {
  const knex = require("../knex").default;
  const hasTable = await knex.schema.hasTable(name);
  const schema = config.schema.describe();

  const tableTypes = {
    number: "integer",
    string: "string",
  };

  console.log({ schema });

  if (!hasTable) {
    // Create the table if it doesn't exist in the database
    const createQuery = knex.schema.createTable(name, (table) => {
      Object.keys(schema).forEach((key) => {
        const colSchema = schema[key];
        const col = table[tableTypes[colSchema.type]](key);
        if (colSchema.required) {
          col.notNullable();
        } else {
          col.nullable();
        }
        if (colSchema.defaultValue) {
          col.default(colCcolSchema.defaultValue);
        }
      });
    });

    console.log(createQuery.toString());
    return
  }

  // Check if we need to update the table
};

export const useEntity = (name, config) => {
  serveronly: if (isServer()) {
    createEndpoints(name, config);
    createTable(name, config);
  }

  return () => {};
};
