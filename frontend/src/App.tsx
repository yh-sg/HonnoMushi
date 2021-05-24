import React from "react";
import {Routes} from './Routes'

import Navigation from "./components/Navigation/Navigation";

const App: React.FC = () => {
	return (
		<>
			<Navigation/>
			<Routes/>
		</>
	);
};

export default App;
