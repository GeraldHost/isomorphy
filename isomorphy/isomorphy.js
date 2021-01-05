let createEndpoints;
serveronly: createEndpoints = (name, config) => {
  console.log("Create endpoints");
};

export const useIsomorphy = (name, config) => {
  serveronly: if (typeof window === "undefined") {
    createEndpoints(name, config);
  }

  return () => {};
};
