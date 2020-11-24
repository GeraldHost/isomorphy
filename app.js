import React from "react";
import { Route, Switch } from "./router";
import { useEntity } from "./entity";

export default () => {
  const user = useEntity("users", {});

  return (
    <Route path="/" exact>
      <div id="APP">App</div>
    </Route>
  );
};

