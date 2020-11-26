import React from "react";
import { useRoute, Link } from "../isomorphy/client/router";

export const routes = [
  { name: "home", path: "/" },
  { name: "foo", path: "/foo" },
];

export const App = () => {
  const { route } = useRoute();
  console.log(route.name);
  if (route.name === "home") {
    console.log("home has been called");
    return (
      <div id="APP">
        <h1>Home</h1>
        <Link to="foo">Go to foo</Link>
      </div>
    );
  } else if (route.name === "foo") {
    console.log("foo has been called");
    return (
      <div id="APP">
        <h1>Foo</h1>
        <Link to="home">Go to home</Link>
      </div>
    );
  } else {
    return "404";
  }
};

export default App;
