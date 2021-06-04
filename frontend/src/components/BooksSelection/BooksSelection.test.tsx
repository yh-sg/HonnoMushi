import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import BooksSelection from "./BooksSelection";

afterEach((): void => {
	cleanup();
});

describe("should render BooksSelection component correctly", () => {
	test("render button without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<BooksSelection></BooksSelection>, div);
	});

	test("should render alphabet buttons correctly", () => {
		const { getAllByTestId } = render(<BooksSelection />);
		const oneAlphabet = screen.getByText("Q");

		expect(getAllByTestId("letterButton")).toBeTruthy();
		expect(oneAlphabet).toBeInTheDocument();
	});

	test("should render number buttons correctly", () => {
		const { getAllByTestId } = render(<BooksSelection />);
		const oneNumber = screen.getByText("7");

		expect(getAllByTestId("numberButton")).toBeTruthy();
		expect(oneNumber).toBeInTheDocument();
	});

	// to update snapshot, press 'w' and 'u'
	test("should match snapshot", () => {
		const tree = renderer.create(<BooksSelection />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
