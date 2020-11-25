import React from "react";
import { useRoute } from "../isomorphy/router";

export default () => {
  console.log("app has been called");

  const { route } = useRoute();
  if (route.name === "home") {
    console.log("home has been called");
    return <div id="APP">Home</div>;
  } else if (route.name === "foo") {
    console.log("foo has been called");
    return <div id="APP">Foo</div>;
  } else {
    return "404";
  }
};
