import React from "react";
import PageOne from "./components/PageOne";

const App: React.FC = () => {
	const lettersAndNumerics = "abcdefghijklmnopqrstuvwxyz0123456789",
		letters: String[] = lettersAndNumerics.split("");

	return (
		<>
			<PageOne />
		</>
	);
};

export default App;
