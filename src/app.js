import React from "react";
import * as Yup from "yup";
import { Link, Route } from "../isomorphy/client/router";
import { shape, string, number } from "../isomorphy/client/schema";
import { useEntity } from "../isomorphy/client/entity";

export const routes = [
  { name: "home", path: "/" },
  { name: "foo", path: "/foo" },
];

const userSchema = shape({
  id: number({ required: true }),
  email: string({ required: true }),
  password: string({ required: true }).min(8),
});

// const shemaAsJson = [
//   { field: "id", type: "number", null: false, default: null, extra: auto_increment },
//   { field: "email", type: "string", null: false, default: null },
//   { field: "password", type: "string", null: false, default: null },
// ];

// this.integer("id").notNullable();
// this.string("email").notNullable();
// this.string("password").notNullable();

export const App = () => {
  const user = useEntity("users", { schema: userSchema });
  return (
    <>
      <Route name="home">
        <h1>Home</h1>
        <Link to="foo">foo</Link>
      </Route>
      <Route name="foo">
        <h1>Foo</h1>
        <Link to="home">home</Link>
      </Route>
    </>
  );
};

export default App;
