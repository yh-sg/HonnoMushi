import React from "react";
import { render, cleanup } from "@testing-library/react";
import ReactRouter from "react-router";
import { Route, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createStore } from "redux";
import { rootReducer } from "../../store/rootReducer";

import { renderWithRedux, renderWithRouter } from "../../TestingUtil";
import Books from "./Books";

beforeEach((): void => {
	jest
		.spyOn(ReactRouter, "useParams")
		.mockReturnValue({ alphabet: "/books/k" });
});

afterEach((): void => {
	cleanup();
});

const initialState = {};

describe("should render Books component correctly", () => {
	test("renders Book component with Redux", () => {
		const configureMockStore = configureStore();
		const store = createStore(rootReducer, initialState);

		// render(
		//   <Provider store={store}>
		// <MemoryRouter initialEntries={['books/p']}>
		//   <Route path='books/:alphabet'>
		//     {<Books />}
		//   </Route>
		// </MemoryRouter>
		// </Provider>)
		// const { getByTestId } = renderWithRouter(<Books />, initialState);
		const { getByTestId } = render(
			<Provider store={store}>
				<Books />
			</Provider>
		);
	});
});
