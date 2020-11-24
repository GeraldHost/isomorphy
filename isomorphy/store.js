export const createStore = () => {
	let state = null;

	const dispatch = (fn) => state = fn(state);

	const getState = () => state;

	const save = () => {}

	return { save, getState, dispatch }
}

export const store = createStore();

export const addRoute = (newRoute) => store.dispatch(state => ({ ...state, routes: [...state.routes, newRoute] }));
export const addEntity = (entity) => store.dispatch(state => ({ ...state, [entity.name]: entity }));