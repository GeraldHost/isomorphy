import React from "react";

import { useIsomorphy } from "../isomorphy/isomorphy";
import { Link, Route } from "../isomorphy/router";

export const routes = [
  { name: "home", path: "/" },
  { name: "foo", path: "/foo" },
];

export const App = () => {
  const user = useEntity("users");
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
