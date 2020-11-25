import React from "react";
import * as ReactRouter from "react-router-dom";
import { addRoute } from "./store";
import { isServer } from "./utils";

export const Route = (props) => {
  if (isServer()) {
    const { path } = props;
    addRoute(path);
  }
  return <ReactRouter.Route {...props} />;
};

export const Switch = ReactRouter.Switch;
