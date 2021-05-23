import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Books from "./containers/Books/Books";

const App: React.FC = () => {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/'>
					<HomePage />
				</Route>
				<Route path='/about'>
					<About />
				</Route>
				<Route path='/contact'>
					<Contact />
				</Route>
				<Route path='/books/:letter'>
					<Books />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
