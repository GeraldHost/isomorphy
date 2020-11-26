import React from "react";
import { useRoute, Link } from "../isomorphy/router";

export default () => {
  const { route } = useRoute();
  if (route.name === "home") {
    console.log("home has been called");
    return (
      <div id="APP">
        <h1>Home</h1>
        <Link to="/foo">Go to foo</Link>
      </div>
    );
  } else if (route.name === "foo") {
    console.log("foo has been called");
    return (
      <div id="APP">
        <h1>Foo</h1>
        <Link to="/">Go to home</Link>
      </div>
    );
  } else {
    return "404";
  }
};
