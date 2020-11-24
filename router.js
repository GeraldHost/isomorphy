import ReactRouter from "react-router-dom";

export const Route = (props) => {
  const { path } = props;
  // register path with the app
  return <ReactRouter.Route {...props} />;
};

export const Switch = ReactRouter.Switch;
