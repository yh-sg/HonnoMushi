import { render, screen, fireEvent } from "@testing-library/react";

import BooksSelection from "./BooksSelection";

describe("should render BooksSelection component", () => {
	it("should render alphabet buttons correctly", () => {
		const { queryAllByTestId } = render(<BooksSelection />);
		expect(queryAllByTestId("letterButton")).toBeTruthy();

		const oneAlphabet = screen.getByText("Z");
		expect(oneAlphabet).toBeInTheDocument();
	});

	it("should render number buttons correctly", () => {
		const { queryAllByTestId } = render(<BooksSelection />);
		expect(queryAllByTestId("numberButton")).toBeTruthy();

		const oneNumber = screen.getByText("7");
		expect(oneNumber).toBeInTheDocument();
	});
});
