import React from "react";
import { Route } from "../isomorphy";

export default () => {
  return (
    <Route path="/" exact>
      <div id="APP">App</div>
    </Route>
  );
};

