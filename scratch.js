// All of this gets created by useResource
// user resource
router.get("/").post("/").put("/").del("/");

// endpoint handlers
const handleSelect = () => {}
const handleInsert = () => {}
const handleUpdate = () => {}
const handleDelete = () => {}

// fetcher
const get = () => {}
const post = () => {}
const del = () => {}
const put = () => {}

// migration
const createTable = () => {
  const diffTable = () => {}
  // check if table exists
  // check if columns have changed
  // check if column is missing
  // update table based on that diff
}

// Example: create new user
const userSchema = Yup.object({
  id: Yup.number().increment(),
  email: Yup.string(),
  name: Yup.string(),
});

const App = () => {
  const users = useResource("users", userSchema);

  const onSubmit = async (data) => {
    const resp = await users.create(data);
    if(!resp.ok) {
      // error
    }
    // success
  }

  return ( ... );
}




export const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
});

const isServer = () => !(typeof window != "undefined" && window.document);

const createTable = (resource, schema) => {
  // create table
  const query = knex.schema.createTable(resource, schema).toString();
  console.log("Create table", resource);
};

const createRoutes = (resource) => {
  // set up koa routes
  console.log("Create routes", resource);
};

export const useResource = (resource, opt) => {
  if (isServer()) {
    createTable(resource, opt.schema);
    createRoutes(resource);
  }

  return {
    select: undefined,
    where: undefined,
    insert: undefined,
    update: undefined,
    destroy: undefined,
  };
};