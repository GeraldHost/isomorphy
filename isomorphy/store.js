export const createStore = () => {
  let state = { routes: [], entities: [] };

  const dispatch = (fn) => (state = fn(state));

  const getState = () => state;

  const save = () => {};

  return { save, getState, dispatch };
};

const store = createStore();

export const addEntity = (entity) => {
  const currentEntities = state.entities;
  const entities = { ...currentEntities, entity };
  store.dispatch((state) => ({ ...state, entities }));
};

export const getState = store.getState;

