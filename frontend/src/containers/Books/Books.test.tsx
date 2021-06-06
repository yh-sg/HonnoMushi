import React from "react";
import { render, cleanup } from "@testing-library/react";
import ReactRouter from "react-router";
import { renderWithRedux, renderWithRouter } from "../../TestingUtil";
import Books from "./Books";

afterEach((): void => {
	cleanup();
});

// const initialState = {};

describe("should render Books component correctly", () => {
	test("renders Book component with Redux", () => {
		jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "/books" });
		// const { getByTestId } = renderWithRouter(<Books />, initialState);
	});
});
