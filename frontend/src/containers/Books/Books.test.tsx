import React from "react";
import { render, cleanup } from "@testing-library/react";
import ReactRouter from "react-router";
import{ Route, MemoryRouter} from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { renderWithRedux, renderWithRouter } from "../../TestingUtil";
import Books from "./Books";

afterEach((): void => {
	cleanup();
});

const initialState = {};

describe("should render Books component correctly", () => {
	test("renders Book component with Redux", () => {
	const configureMockStore = configureStore();

	const store = configureMockStore(initialState);

    render(
      <Provider store={store}>
    <MemoryRouter initialEntries={['books/p']}>
      <Route path='books/:alphabet'>
        {<Books />}
      </Route>
    </MemoryRouter>
    </Provider>)
		// jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "/books/k" });
		// const { getByTestId } = renderWithRouter(<Books />, initialState);
	});
});
