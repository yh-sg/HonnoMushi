import { render, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

afterEach((): void => {
	cleanup();
});

describe("should render HomePage component", () => {
	test("should render HomePage component correctly", () => {
		// render a react component to the DOM
		const div = document.createElement("div");
		ReactDOM.render(<HomePage />, div);

		expect(div.querySelector("h3").textContent).toBe(
			"Find books by letters or alphabets"
		);
	});

	// render + cleanup will take snapshot
	test("should match snapshot", () => {
		const { asFragment } = render(<HomePage />);
		expect(asFragment()).toMatchSnapshot();
	});
});
