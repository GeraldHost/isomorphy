import React from "react";
import * as Yup from "yup";
import { useRoute, Link, Route } from "../isomorphy/client/router";
import { useEntity } from "../isomorphy/client/entity";

export const routes = [
  { name: "home", path: "/" },
  { name: "foo", path: "/foo" },
];

const UserSchema = Yup.object({
  id: Yup.number().required(), // TODO: this needs to be auto increment
  email: Yup.string().required(),
  password: Yup.string().min(8).required(),
});

export const App = () => {
  const user = useEntity("users", { schema: UserSchema });
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
