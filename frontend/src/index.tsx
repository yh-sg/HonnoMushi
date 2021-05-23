import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";


import "./index.css";
import App from "./App";

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>
	</Router>
	,
	document.getElementById("root")
);
