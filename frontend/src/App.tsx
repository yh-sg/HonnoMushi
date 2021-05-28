import React from "react";
import { Routes } from "./Routes";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
	return (
		<>
			<Navigation />
			<Routes />
			<Footer />
		</>
	);
};

export default App;
