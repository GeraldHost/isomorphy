import React from "react";
import * as Yup from "yup";
import { Link, Route } from "../isomorphy/client/router";
import { shape, schema } from "../isomorphy/client/schema";
import { useEntity } from "../isomorphy/client/entity";

export const routes = [
  { name: "home", path: "/" },
  { name: "foo", path: "/foo" },
];

const userSchema = shape({
  id: schema().number().required(),
  email: schema().string().required(),
  password: schema().string().min(8).required(),
});

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
