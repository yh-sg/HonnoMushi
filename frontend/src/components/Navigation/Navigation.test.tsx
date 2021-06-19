import { render, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";

afterEach((): void => {
	cleanup();
});

describe("should render Navigation component", () => {
	test("should render Navigation component correctly", () => {
		const div = document.createElement("div");
		ReactDOM.render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>,
			div
		);
		expect("HonnoMushi").toBeTruthy();
	});

	test("should render input box correctly", () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);
		expect(getByTestId("input-book")).toHaveValue("Coming soon...");
	});

	test("should render search button correctly", () => {
		const { getByTestId } = render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>
		);
		expect(getByTestId("search")).toHaveTextContent("🔍");
	});

	// test("should match snapshot", () => {
	// 	const tree = render(
	// 		<BrowserRouter>
	// 			<Navigation />
	// 		</BrowserRouter>
	// 	);
	// 	expect(tree).toMatchSnapshot();
	// });
});
