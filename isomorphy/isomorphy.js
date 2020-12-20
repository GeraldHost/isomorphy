let createEndpoints;
serveronly: createEndpoints = (name, config) => {
  console.log("Create endpoints");
};

export const useIsomorphy = (name, config) => {
  serveronly: {
    createEndpoints(name, config);
  }

  return () => {};
};
