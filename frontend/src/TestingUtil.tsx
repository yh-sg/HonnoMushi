import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { rootReducer } from "./store/rootReducer";

export function renderWithRedux(
	component: React.ReactElement,
	initialState = {}
	// { initialState, store = createStore(rootReducer, initialState) } = {}
) {
	const configureMockStore = configureStore();
	const store = configureMockStore(initialState);
	return {
		...render(<Provider store={store}>{component}</Provider>),
		store,
	};
}

export function renderWithRouter(
	component: React.ReactElement,
	initialState = {},
	initialEntries: any[] = ["/"]
) {
	const history = createMemoryHistory({ initialEntries });
	const store = createStore(rootReducer, initialState);

	return {
		...render(
			<Provider store={store}>
				<Router history={history}></Router>
				{component}
			</Provider>
		),
	};
}
